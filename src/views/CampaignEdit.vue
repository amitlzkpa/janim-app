<template>
  <div>
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-images>
            <vs-image
              :key="index"
              :src="`https://picsum.photos/400/400?image=2${index}`"
              v-for="(image, index) in 2"
              class="full-width"
            />
            <vs-image
              :key="index + 2"
              :src="`https://picsum.photos/400/400?image=1${index}`"
              v-for="(image, index) in 7"
              class="third-width"
            />
          </vs-images>
        </div>
      </vs-col>

      <vs-col vs-w="9">
        <div class="mt-20 pa-10">
          <vs-row>
            <vs-col vs-w="12">
              <div class="full-width" style="display: flex">
                <vs-dropdown>
                  <a href="#" class="text--grey">
                    Stanton Media
                    <vs-icon
                      style="font-size: 12px"
                      icon="expand_more"
                    ></vs-icon>
                  </a>

                  <vs-dropdown-menu>
                    <vs-dropdown-item> Stanton Media </vs-dropdown-item>
                    <vs-dropdown-item> Zephyr Adverts </vs-dropdown-item>
                    <vs-dropdown-item> Nova Agency </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
                <span style="flex-grow: 1" />
                <vs-button color="primary" type="flat" @click="saveCampaign()"
                  >Save</vs-button
                >
              </div>
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <ContentEditable
                tag="span"
                v-model="editedCampaignData.title"
                styleText="
                  cursor: select;
                  border: 1px dashed grey;
                  border-radius: 8px;
                  color: grey;
                  font-family: 'Roboto', sans-serif;
                  font-size: 60px;
                  font-weight: 100;
                  min-height: 70px;
                  width: 100%;
                  display: inline-block;
                "
              />
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <ContentEditable
                tag="span"
                v-model="editedCampaignData.description"
                styleText="
                  cursor: select;
                  border: 1px dashed grey;
                  border-radius: 8px;
                  color: #4d4d4d;
                  font-family: 'Lato', sand-serif;
                  font-size: 20px;
                  height: 80px;
                  width: 100%;
                  display: inline-block;
                  resize: vertical;
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-top: 2px;
                "
              />
            </vs-col>
          </vs-row>

          <vs-row class="mt-16">
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div
                  class="info-item flex-center pt-10"
                  @click="showCampaignTimelinePopup = true"
                >
                  <DateRangeViewer :dateRange="editedCampaignData.dateRange" />
                </div>
                <vs-popup
                  title="Campaign Timeline"
                  :active.sync="showCampaignTimelinePopup"
                >
                  <vs-row>
                    <vs-col vs-w="6" style="text-align: center"
                      >Start Date</vs-col
                    >
                    <vs-col vs-w="6" style="text-align: center"
                      >End Date</vs-col
                    >
                  </vs-row>
                  <vs-row>
                    <vs-col>
                      <div class="flex-center my-8">
                        <date-picker
                          range
                          inline
                          v-model="editedCampaignData.dateRange"
                        ></date-picker>
                      </div>
                    </vs-col>
                  </vs-row>
                  <div class="full-width" style="text-align: right">
                    <vs-button
                      type="filled"
                      @click="showCampaignTimelinePopup = false"
                      >Save</vs-button
                    >
                  </div>
                </vs-popup>
              </vs-card>
            </vs-col>
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div
                  class="info-item flex-center pt-10"
                  @click="showCampaignBudgetPopup = true"
                >
                  ${{ editedCampaignData.totalBudget }} bounty
                </div>
                <vs-popup
                  title="Campaign Budget"
                  :active.sync="showCampaignBudgetPopup"
                >
                  <vs-row>
                    <vs-col vs-w="3">
                      Total Budget
                      <vs-input-number
                        v-model="editedCampaignData.totalBudget"
                        label="$"
                        :min="200"
                        :max="10000"
                        :step="200"
                      />
                      Hits Goal
                      <vs-input-number
                        v-model="editedCampaignData.hitsGoal"
                        :min="200"
                        :step="200"
                      />
                    </vs-col>
                    <vs-col vs-w="9">
                      <div class="info-item pt-24" style="text-align: center">
                        <small>(approximate price per hit)</small>
                        <br />
                        ${{
                          (
                            editedCampaignData.totalBudget /
                            editedCampaignData.hitsGoal
                          ).toFixed(2)
                        }}
                      </div>
                    </vs-col>
                  </vs-row>
                </vs-popup>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col vs-w="1" class="flex-center">
              <vs-switch color="success" v-model="editedCampaignData.isActive">
                <span slot="on">Live</span>
                <span slot="off">Paused</span>
              </vs-switch>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey">
                <i
                  >{{
                    moment
                      .duration(
                        moment(editedCampaignData.dateRange[1]).diff(moment())
                      )
                      .humanize()
                  }}
                  to go</i
                >
              </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="star_outline" color="rgb(255, 130, 0)"></vs-icon>
              <span class="ml-8 text--grey"> 4,702 HITS </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="person_outline" color="success"></vs-icon>
              <span class="ml-8 text--grey"> 78 MEMBERS </span>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col vs-w="8">
              <vs-tabs>
                <vs-tab label="Activity">
                  <div>
                    <vs-card
                      v-for="activityItem in activityItems"
                      :key="activityItem.id"
                    >
                      <div>
                        <span class="text--grey">
                          <i>
                            {{ moment(activityItem.date).fromNow() }}
                          </i>
                        </span>
                        <br />
                        <span>{{ activityItem.content }}</span>
                      </div>

                      <div slot="footer">
                        <vs-row vs-justify="flex-end">
                          <vs-button
                            type="gradient"
                            :color="activityItem.iconColor"
                            :icon="activityItem.icon"
                          >
                          </vs-button>
                        </vs-row>
                      </div>
                    </vs-card>
                  </div>
                </vs-tab>
                <vs-tab label="Members">
                  <div>
                    <vs-list>
                      <vs-list-item
                        title="Steve Jobes"
                        subtitle="Tarcu id augue ultrices feugiat"
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                      <vs-list-item
                        title="Matt"
                        subtitle="Oligula at mollis egestas."
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                      <vs-list-item
                        title="Wilfred Menzes"
                        subtitle="Rendrerit sapien vitae felis viverra, quis efficitur velit blandit."
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                    </vs-list>
                  </div>
                </vs-tab>
              </vs-tabs>
            </vs-col>
            <vs-col vs-w="4">
              <div style="text-align: center">
                <div class="my-10" @click="showGeographicTargetingPopup = true">
                  <img
                    src="/imgs/dotted-map.png"
                    alt="Target Regions"
                    style="object-fit: cover; width: 100%"
                  />
                  <div class="flex-center mt-10" style="flex-wrap: wrap">
                    <span class="country-label">USA</span>
                    <span class="country-label">California</span>
                    <span class="country-label">Portland</span>
                    <span class="country-label">Oregon</span>
                    <span class="country-label">West Coast</span>
                    <span class="country-label">Barcelona</span>
                    <span class="country-label">Spain</span>
                    <span class="country-label">Hamburg</span>
                    <span class="country-label">Munich</span>
                    <span class="country-label">Germany</span>
                  </div>

                  <vs-popup
                    title="Geographic Targeting"
                    :active.sync="showGeographicTargetingPopup"
                  >
                    <vs-row>
                      <vs-col vs-w="4">
                        <vs-select
                          placeholder="Select countries"
                          multiple
                          autocomplete
                          class="ml-8"
                          label="Regions"
                          v-model="editedCampaignData.targetCountries"
                        >
                          <vs-select-item
                            :key="country.code"
                            :value="country"
                            :text="country.name"
                            v-for="country in countryList"
                          />
                        </vs-select>
                        <div
                          style="
                            height: 300px;
                            width: 100%;
                            overflow-x: hidden;
                            overflow-wrap: break-word;
                          "
                          class="pa-8 ma-8"
                        >
                          <span
                            class="country-label"
                            v-for="country in editedCampaignData.targetCountries"
                            :key="country.code"
                            >{{ country.name }},</span
                          >
                        </div>
                      </vs-col>
                      <vs-col vs-w="8"></vs-col>
                    </vs-row>
                  </vs-popup>
                </div>

                <vs-divider />

                <div
                  class="my-10"
                  @click="showDemographicTargetingPopup = true"
                >
                  <div
                    class="pt-48 text--grey"
                    style="
                      flex-direction: column;
                      font-family: 'Roboto', sand-serif;
                      font-weight: 200;
                      font-size: 24px;
                    "
                  >
                    <span> TARGET PROFILE </span>
                    <div
                      v-if="editedCampaignData.ageRange[0]"
                      class="flex-center"
                    >
                      <vs-icon
                        class="material-icons-outlined"
                        icon="supervisor_account"
                        color="grey"
                        size="75px"
                      ></vs-icon>
                      <span class="ml-8" style="font-size: 36px">
                        {{ editedCampaignData.ageRange[0] }}-{{
                          editedCampaignData.ageRange[1]
                        }}
                        yo
                      </span>
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[0] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[1] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[2] }}
                    </div>
                  </div>

                  <vs-popup
                    title="Demographic Targeting"
                    :active.sync="showDemographicTargetingPopup"
                  >
                    <div class="pa-8">
                      Age Range
                      <vs-row>
                        <vs-col vs-w="10">
                          <vs-slider
                            :step="1"
                            v-model="editedCampaignData.ageRange"
                          />
                        </vs-col>
                        <vs-col vs-w="2">
                          <div class="pa-10">
                            <div v-if="!editedCampaignData.ageRange[0]">-</div>
                            <div v-else>
                              {{ editedCampaignData.ageRange[0] }}-{{
                                editedCampaignData.ageRange[1]
                              }}
                              yo
                            </div>
                          </div>
                        </vs-col>
                      </vs-row>

                      <br />

                      Descriptors
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[0]"
                      />
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[1]"
                      />
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[2]"
                      />
                    </div>
                  </vs-popup>
                </div>

                <vs-divider />

                <div class="my-10" @click="showKeywordTargetingPopup = true">
                  <div
                    v-if="editedCampaignData.targetKeywords.length < 1"
                    style="text-align: center"
                    class="pa-24"
                  >
                    <p
                      class="text--grey"
                      style="
                        font-family: 'Roboto', sans-serif;
                        font-weight: 200;
                        font-style: italic;
                      "
                    >
                      (no keywords)
                    </p>
                  </div>
                  <div v-else>
                    <vs-chip
                      class="mx-4"
                      v-for="(kw, idx) of editedCampaignData.targetKeywords"
                      :key="idx"
                      >#{{ kw }}</vs-chip
                    >
                  </div>

                  <vs-popup
                    title="Keyword Targeting"
                    :active.sync="showKeywordTargetingPopup"
                  >
                    <div style="height: 300px">
                      <vs-row>
                        <vs-col vs-w="5" class="pa-8">
                          <vs-input
                            size="large"
                            label-placeholder="keyword"
                            v-model="nextKeyword"
                            icon-after="true"
                            icon="add"
                            v-on:icon-click="addNextKeyword"
                          />
                        </vs-col>
                        <vs-col vs-w="7" class="pa-8">
                          <vs-chip
                            class="mx-4"
                            v-for="(
                              kw, idx
                            ) of editedCampaignData.targetKeywords"
                            :key="idx"
                            >#{{ kw }}</vs-chip
                          >
                        </vs-col>
                      </vs-row>
                    </div>
                  </vs-popup>
                </div>
              </div>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import ContentEditable from "@/components/ContentEditable";
import DateRangeViewer from "@/components/DateRangeViewer";

export default {
  components: {
    ContentEditable,
    DateRangeViewer,
    DatePicker,
  },
  data() {
    return {
      showCampaignTimelinePopup: false,
      showCampaignBudgetPopup: false,
      showGeographicTargetingPopup: false,
      showDemographicTargetingPopup: false,
      showKeywordTargetingPopup: false,
      nextKeyword: "",
      countryList: [
        { name: "Afghanistan", code: "AF" },
        { name: "Åland Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "AndorrA", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia", code: "BO" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, The Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "Cote D'Ivoire", code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and Mcdonald Islands", code: "HM" },
        { name: "Holy See (Vatican City State)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic Of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Korea, Democratic People'S Republic of", code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: "Lao People'S Democratic Republic", code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libyan Arab Jamahiriya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Netherlands Antilles", code: "AN" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestinian Territory, Occupied", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "Reunion", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "RWANDA", code: "RW" },
        { name: "Saint Helena", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia and Montenegro", code: "CS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" },
      ],
      editedCampaignData: {
        id: null,
        isActive: true,
        title: "",
        description: "",
        dateRange: [],
        totalBudget: 200,
        hitsGoal: 200,
        ageRange: [],
        targetCountries: [],
        targetDescriptors: ["", "", ""],
        targetKeywords: [],
      },
      storedCampaignData: {},
      activityItems: [
        {
          id: "a",
          content: "Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2021-02-27T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "b",
          content:
            "Fusce condimentum purus id finibus gravida. Proin sed justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-12-14T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "c",
          content:
            "Sed hendrerit sapien vitae felis viverra, quis efficitur velit blandit.",
          date: this.moment("2020-11-09T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "d",
          content:
            "Mauris porttitor ligula at mollis egestas. Vestibulum aliquam urna at porttitor aliquam. Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2020-11-07T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "e",
          content: "Justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-07-01T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "f",
          content:
            "Volutpat nulla molestie lectus congue dictumonec sed nisl imperdiet, auctor turpis vel, ultricies mauris.",
          date: this.moment("2020-06-19T00:00:00"),
          icon: "share",
          iconColor: "success",
        },
        {
          id: "g",
          content:
            "Volutpat nulla molestie lectus congue dictumonec sed nisl imperdiet, auctor turpis vel, ultricies mauris.",
          date: this.moment("2020-06-19T00:00:00"),
          icon: "share",
          iconColor: "success",
        },
        {
          id: "h",
          content:
            "Pelit molestie lectus congue dictum. Maecenas ornare nisl ut est euismod, sit amet vehicula est suscipit. Maecenas non est efficitur, malesuada massa eget, ullamcorper ex.",
          date: this.moment("2020-05-22T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "i",
          content:
            "Mauris porttitor ligula at mollis egestas. Vestibulum aliquam urna at porttitor aliquam. Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2020-11-07T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "j",
          content: "Justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-07-01T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
      ],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      let campaignId = this.$route.params.campaignId;
      if (!campaignId) return;
      let doc = await fb.campaignsCollection.doc(campaignId).get();
      let campaignData = doc.data();
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => d.toDate()
      );
      this.editedCampaignData = campaignData.campaign;
      this.storedCampaignData = JSON.parse(
        JSON.stringify(this.editedCampaignData)
      );
      console.log(this.editedCampaignData);
    },
    addNextKeyword() {
      if (
        this.editedCampaignData.targetKeywords.includes(
          this.nextKeyword.toLowerCase()
        )
      )
        return;
      this.editedCampaignData.targetKeywords.push(
        this.nextKeyword.toLowerCase()
      );
      this.nextKeyword = "";
    },
    async saveCampaign() {
      this.$store.dispatch("saveCampaign", {
        campaign: this.editedCampaignData,
      });
    },
  },
};
</script>

<style scoped>
</style>
