<template>
  <div class="pa-10 mt-20">
    <div>
      <vs-row>
        <vs-col>
          <span style="font-size: 60px; font-weight: 100"
            >My Organizations</span
          >
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="4">
          <ContentEditable
            tag="span"
            v-model="orgFilterTerm"
            placeholderValue="search"
            styleText="
              cursor: select;
              font-size: 30px;
              font-weight: 100;
              min-height: 40px;
              width: 100%;
              display: inline-block;
            "
          />
          <div
            class="ma-8 pa-20"
            style="
              height: 600px;
              overflow-x: hidden;
              direction: rtl;
            "
          >
            <div style="direction: ltr;">
              <div
                v-for="org in filteredOrgList"
                :key="org.id"
                @click="updateSelectedOrg(org)"
              >
                <vs-card
                  actionable
                  :style="
                    selectedOrg.id === org.id ? 'border: 1px solid #DEDEDE' : ''
                  "
                >
                  <div
                    style="height: 100px; overflow-x: hidden; overflow-y: auto"
                  >
                    <span>
                      <i> {{ org.id }} </i>
                    </span>
                    <br />
                    <span style="font-weight: 600; font-size: 24px">
                      {{ org.name }}
                      <vs-icon
                        v-if="userProfile.id === org.owner.id"
                        icon="verified_user"
                        size="16px"
                      />
                    </span>
                    <p
                      :style="`
                        margin-left: ${
                          [20, 40, 80][Math.floor(Math.random() * 3)]
                        }px;
                        width: ${
                          [180, 240, 300][Math.floor(Math.random() * 3)]
                        }px;
                        ${
                          selectedOrg.id === org.id
                            ? 'border-bottom: 1px solid #DEDEDE'
                            : ''
                        };
                    `"
                    />
                    <br />
                    <div>
                      <vs-icon icon="person" size="12px" />
                      <span style="font-size: 18px">
                        {{ org.perms.length }}
                      </span>
                      <span class="mx-8" />
                      <vs-icon icon="campaign" size="12px" />
                      <span style="font-size: 18px"> 4 </span>
                    </div>
                  </div>
                </vs-card>
              </div>

              <div
                style="height: 300px"
                id="div-with-loading"
                class="flex-center full-width vs-con-loading__container"
              />
            </div>
          </div>
          <div @click="showNewOrgPopup = true">
            <vs-card
              actionable
              style="
                height: 80px;
                border-radius: 8px;
                text-align: center;
                background-color: #dedede;
              "
              class="flex-center"
            >
              <vs-icon icon="add" color="white" size="large" class="mt-6" />
            </vs-card>
            <vs-prompt
              title="Create New Organization"
              button-accept="gradient"
              color="danger"
              accept-text="Create"
              @accept="onCreateNewOrg"
              @cancel="newOrgName = ''"
              :active.sync="showNewOrgPopup"
            >
              <div class="pa-24">
                Name:
                <vs-input v-model="newOrgName" class="full-width" />
              </div>
            </vs-prompt>
          </div>
        </vs-col>
        <vs-col vs-w="8">
          <div class="pa-36 mt-10">
            <div v-if="selectedOrg.id">
              <p style="font-size: 40px; font-weight: 600">
                {{ selectedOrg.name }}
              </p>

              <vs-tabs class="mt-8">
                <vs-tab label="Users">
                  <div
                    v-if="selectedOrg.currUserPerm.permissions.admin"
                    class="my-16"
                  >
                    <vs-input
                      v-model="newUserEmail"
                      class="full-width"
                      type="email"
                      label="Invite User"
                      placeholder="Email"
                      icon="add"
                      @icon-click="inviteUser"
                    />
                  </div>
                  <div>
                    <vs-table
                      :data="selectedOrg.perms"
                      style="background-color: transparent"
                      class="soft-shadow-text"
                    >
                      <template slot="thead">
                        <vs-th> Name </vs-th>
                        <vs-th> Email </vs-th>
                        <vs-th> Admin </vs-th>
                      </template>

                      <template slot-scope="{ data }">
                        <vs-tr
                          v-for="(tr, indextr) in data"
                          :key="indextr"
                          style="
                            background-color: transparent;
                            border-bottom: 1px solid #dedede;
                          "
                        >
                          <vs-td :data="data[indextr].holder.name">
                            <span
                              style="cursor: pointer"
                              v-if="selectedOrg.currUserPerm.permissions.admin"
                              @click="removeUser(data[indextr])"
                            >
                              <vs-icon icon="close" size="12px" class="mr-8" />
                            </span>
                            <span style="font-size: 16px">
                              {{ data[indextr].holder.name }}
                            </span>
                          </vs-td>

                          <vs-td :data="data[indextr].holderType">
                            {{ data[indextr].holder.email }}
                          </vs-td>

                          <vs-td :data="data[indextr].id">
                            <span
                              style="cursor: pointer"
                              v-if="selectedOrg.currUserPerm.permissions.admin"
                              @click="
                                updatePermissionForUsrForOrg(
                                  data[indextr],
                                  !data[indextr].permissions.admin
                                )
                              "
                            >
                              <vs-icon
                                v-if="data[indextr].permissions.admin"
                                icon="check_box"
                              />
                              <vs-icon v-else icon="check_box_outline_blank" />
                            </span>
                            <span v-else>
                              <vs-icon
                                v-if="data[indextr].permissions.admin"
                                icon="done"
                              />
                            </span>
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </vs-tab>

                <vs-tab label="Campaigns">
                  <div>Campaigns</div>
                  <a
                    v-for="campaign in selectedOrg.campaigns"
                    :key="campaign.campaign.id"
                    :href="`/campaign/edit/${campaign.campaign.id}`"
                    style="text-decoration: none"
                  >
                    <vs-card
                      actionable
                      style="height: 90px; border-radius: 8px"
                      class="my-10"
                    >
                      <p
                        style="
                          color: #696969;
                          font-size: 20px;
                          font-weight: 600;
                        "
                      >
                        {{ campaign.campaign.title }}
                      </p>
                      <hr />
                      <p style="color: #696969" class="my-10">
                        {{
                          moment(
                            campaign.campaign.dateRange[0].toDate()
                          ).format("MMM Do YYYY")
                        }}
                        -
                        {{
                          moment(
                            campaign.campaign.dateRange[1].toDate()
                          ).format("MMM Do YYYY")
                        }}
                        <br />
                        ${{ campaign.campaign.totalBudget }}
                      </p>
                    </vs-card>
                  </a>
                </vs-tab>

                <vs-tab label="Accounts">
                  <vs-row>
                    <vs-col vs-w="8" class="pr-36">
                      <BarChart />
                      <div>
                        <h2>Top Earners</h2>
                        <div class="mt-20">
                          <UserList
                            :sampleUserIdx="1"
                            :usersList="
                              selectedOrg.campaignsData.memberJoins.map(
                                (j) => j.user
                              )
                            "
                          />
                        </div>
                      </div>
                    </vs-col>

                    <vs-col vs-w="4">
                      <div class="ml-20">
                        <RapydSenderAcctCard
                          :senderAcctInfo="selectedOrg.senderAcctInfo"
                          :org="selectedOrg"
                          @rapydSenderAcctLinkedToOrg="
                            rapydSenderAcctLinkedToOrg
                          "
                        />

                        <div v-if="selectedOrg.senderAcctInfo">
                          <div
                            class="ml-20"
                            v-for="campaign in selectedOrg.campaigns"
                            :key="campaign.campaign.id"
                          >
                            <div
                              style="height: 90px"
                              class="soft-shadow-text py-8 pr-8 my-8"
                            >
                              <div style="display: flex">
                                <div style="flex-grow: 1">
                                  <p style="font-weight: 500; font-size: 20px">
                                    {{ campaign.campaign.title }}
                                  </p>
                                  {{
                                    moment(campaign.campaign.endDate).format(
                                      "MMM Do YYYY"
                                    )
                                  }}
                                  <br />
                                  {{
                                    userProfile.currencyPref
                                      ? userProfile.currencyPref.symbol_native
                                      : ""
                                  }}
                                  {{ campaign.campaign.totalBudget | currency }}
                                </div>
                                <div style="font-size: 14px" class="pt-24">
                                  <p>
                                    <vs-icon
                                      icon="ads_click"
                                      size="12px"
                                      color="#696969"
                                    />
                                    2,781
                                  </p>
                                  <p>
                                    <vs-icon
                                      icon="payments"
                                      size="12px"
                                      color="#696969"
                                    />
                                    $3166
                                  </p>
                                  <p>
                                    <vs-icon
                                      icon="person_outline"
                                      size="12px"
                                      color="#696969"
                                    />
                                    482
                                  </p>
                                </div>
                                <div
                                  style="width: 80px; font-size: 18px"
                                  class="pt-20 pl-20"
                                >
                                  <div class="raiseOnHover">
                                    <vs-icon
                                      icon="send"
                                      style="
                                        font-size: 30px;
                                        padding: 8px;
                                        border-radius: 50%;
                                        border: 4px solid #ff0080;
                                        color: #ff0080;
                                        cursor: pointer;
                                      "
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <vs-divider
                              style="box-shadow: 0 0px 2px #dedede"
                              class="px-16"
                            />
                          </div>
                        </div>
                      </div>
                    </vs-col>
                  </vs-row>
                </vs-tab>
              </vs-tabs>
            </div>
            <div v-else>
              <div class="mt-10" style="font-size: 30px; font-weight: 100">
                Select an organization to view details.
              </div>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as userSvc from "@/services/userSvc";
import * as orgSvc from "@/services/orgSvc";
import * as rapydSvc from "@/services/rapydSvc";

import ContentEditable from "@/components/ContentEditable";
import UserList from "@/components/UserList";
import RapydSenderAcctCard from "@/components/RapydSenderAcctCard";
import BarChart from "@/components/BarChart";

let defaultBenInfo = {
  // id: "beneficiary_d3da30abd8cd2fb1da4f25e0db111970",
  name: "unknown",
  address: "1 Main Street",
  city: "New York",
  state: "NY",
  postcode: "10101",
  country: "USA",
  email: "unknown@gmail.com",
  identification_type: "identification_id",
  identification_value: "123456789",
  bank_name: "NoBank Bank",
  aba: "777777777",
  account_number: "77711777777777",
  bic_swift: "12345678",
  ach_code: "123456789",
};

let defaultSenInfo = {
  // id: "sender_ca6aad860aec43f5bc4a7c828647faaf",
  name: "unknown",
  address: "1 Second Street",
  city: "New York",
  state: "NY",
  postcode: "11001",
  country: "USA",
  phonenumber: "9892989298",
  identification_type: "License No",
  identification_value: "987654321",
  date_of_birth: "12/12/2000",
  remitter_account_type: "Company",
  source_of_income: "business",
  purpose_code: "ABCDEFGHI",
  account_number: "123456789",
  beneficiary_relationship: "colleague",
};

export default {
  components: {
    ContentEditable,
    UserList,
    RapydSenderAcctCard,
    BarChart,
  },
  data() {
    return {
      showNewOrgPopup: false,
      newOrgName: "",
      orgFilterTerm: "",
      filteredOrgList: [],
      fullOrgList: [],
      selectedOrg: {},
      newUserEmail: "",
    };
  },
  watch: {
    orgFilterTerm(val) {
      if (!val) {
        this.filteredOrgList = this.fullOrgList.map((o) => o);
        return;
      }
      this.filteredOrgList = this.fullOrgList.filter((o) =>
        o.name.toLowerCase().includes(val.toLowerCase())
      );
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  async mounted() {
    let u = await userSvc.currentUser();
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 1,
      color: "#ff0080",
      background: "transparent",
    });
    this.fullOrgList = await orgSvc.getOrgsUserCanAccess({
      userId: u.id,
    });
    await this.wait(1000);
    this.filteredOrgList = this.fullOrgList.map((o) => o);
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");

    let orgId = this.$route.params.orgId;
    let orgIdxInList = this.fullOrgList.findIndex((o) => o.id === orgId);
    if (orgId && orgIdxInList > 0) {
      this.selectedOrg = this.fullOrgList[orgIdxInList];
    }
  },
  methods: {
    async updateSelectedOrg(org) {
      this.selectedOrg = org;
    },
    async onCreateNewOrg() {
      let updOrg = await orgSvc.createNewOrg({
        name: this.newOrgName,
      });
      this.newOrgName = "";
      this.fullOrgList.push(updOrg);
    },
    async inviteUser() {
      if (!/\S+@\S+\.\S+/.test(this.newUserEmail)) {
        this.$vs.notify({
          title: "Invalid Email",
          text: "Please check the email address",
          color: "danger",
        });
        return;
      }
      let updOrg = await orgSvc.addUserToOrg({
        email: this.newUserEmail,
        orgId: this.selectedOrg.id,
        permissions: {},
      });
      this.$vs.notify({
        title: "Invite Sent",
        text: "Invitation to join organization has been sent!",
        color: "primary",
      });
      let orgIdxInList = this.fullOrgList.findIndex((o) => o.id === updOrg.id);
      this.fullOrgList[orgIdxInList] = updOrg;
      this.selectedOrg = updOrg;
    },
    async removeUser(userPerm) {
      if (this.selectedOrg.perms.length === 1) {
        this.$vs.notify({
          title: "Last User",
          text: "Organizations must have at least one account associated",
          color: "danger",
        });
        return;
      }
      let updOrg = await orgSvc.remUserFmOrg({
        orgId: this.selectedOrg.id,
        permObj: userPerm,
      });
      this.$vs.notify({
        title: "User Removed",
        text: "User has been removed from organization.",
        color: "primary",
      });
      let orgIdxInList = this.fullOrgList.findIndex((o) => o.id === updOrg.id);
      this.fullOrgList[orgIdxInList] = updOrg;
      this.selectedOrg = updOrg;
    },
    async updatePermissionForUsrForOrg(permObj, statusToUpdateTo) {
      let adminCnt = this.selectedOrg.perms.filter(
        (p) => !!p.permissions.admin
      ).length;
      if (!statusToUpdateTo && adminCnt === 1) {
        this.$vs.notify({
          title: "Last Admin",
          text: "Organizations must have at least one admin",
          color: "danger",
        });
        return;
      }
      permObj.permissions.admin = statusToUpdateTo;
      let updOrg = await orgSvc.updUserFmOrg({
        orgId: this.selectedOrg.id,
        permObj,
      });
      let orgIdxInList = this.fullOrgList.findIndex((o) => o.id === updOrg.id);
      this.fullOrgList[orgIdxInList] = updOrg;
      this.selectedOrg = updOrg;
    },
    async rapydSenderAcctLinkedToOrg(updOrg) {
      this.selectedOrg = updOrg;
    },
    async sendPayout(recvUser) {
      let recvUserBenInfo =
        recvUser && recvUser.beneficiaryAcct ? recvUser.beneficiaryAcct : {};
      let benInfo = {
        ...defaultBenInfo,
        ...recvUserBenInfo,
      };
      let senInfo = {
        ...defaultSenInfo,
        ...this.selectedOrg.senderAcctInfo,
      };
      // quick hack start: rapyd API errors on the real value
      senInfo.identification_type = "License No";
      // quick hack end: rapyd API errors on the real value
      let newPayoutInfo = {
        beneficiary: benInfo,
        beneficiary_country: "US",
        beneficiary_currency: "USD",
        beneficiary_entity_type: "individual",
        confirm_automatically: true,
        payout_currency: "USD",
        payout_method_type: "us_general_bank",
        sender_amount: 36,
        sender_country: "US",
        sender_currency: "USD",
        sender_entity_type: "company",
        sender: senInfo,
      };
      let q = await rapydSvc.createRapydPayout(newPayoutInfo);
      console.log(q);
    },
  },
};
</script>

<style scoped></style>
