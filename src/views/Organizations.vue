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
        <vs-col vs-w="3">
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
          <div class="mt-8">
            <div
              v-for="org in orgList"
              :key="org.id"
              @click="selectedOrg = org"
              class="flex-center"
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
        <vs-col vs-w="9">
          <div class="pa-36 mt-10">
            <div v-if="selectedOrg.id">
              <p style="font-size: 40px; font-weight: 600">
                {{ selectedOrg.name }}
              </p>

              <vs-tabs class="mt-8">
                <vs-tab label="Users">
                  <div>
                    <vs-table :data="selectedOrg.perms">
                      <template slot="thead">
                        <vs-th> Name </vs-th>
                        <vs-th> Email </vs-th>
                        <vs-th style="text-align: center"> Admin </vs-th>
                      </template>

                      <template slot-scope="{ data }">
                        <vs-tr
                          :state="
                            indextr == 2 || indextr == 5
                              ? 'success'
                              : indextr == 6
                              ? 'danger'
                              : null
                          "
                          :key="indextr"
                          v-for="(tr, indextr) in data"
                        >
                          <vs-td :data="data[indextr].holder.name">
                            {{ data[indextr].holder.name }}
                          </vs-td>

                          <vs-td :data="data[indextr].holderType">
                            {{ data[indextr].holder.email }}
                          </vs-td>

                          <vs-td :data="data[indextr].id">
                            <vs-icon
                              v-if="data[indextr].permissions.admin"
                              icon="done"
                            />
                          </vs-td>
                        </vs-tr>
                      </template>
                    </vs-table>
                  </div>
                </vs-tab>
                <vs-tab label="Campaigns">
                  <div>Campaigns</div>
                </vs-tab>
                <vs-tab label="Accounts">
                  <div>Accounts</div>
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
import * as orgSvc from "@/services/orgSvc";

import ContentEditable from "@/components/ContentEditable";

export default {
  components: {
    ContentEditable,
  },
  data() {
    return {
      showNewOrgPopup: false,
      newOrgName: "",
      orgFilterTerm: "",
      orgList: [],
      selectedOrg: {},
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  async mounted() {
    this.orgList = await orgSvc.getOrgsUserCanAccess();
  },
  methods: {
    async onCreateNewOrg() {
      this.$store.dispatch("createOrg", {
        name: this.newOrgName,
      });
      this.newOrgName = "";
    },
  },
};
</script>

<style scoped></style>
