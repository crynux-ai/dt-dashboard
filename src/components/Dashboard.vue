<script setup>
import {
    Layout,
    LayoutHeader,
    LayoutContent,
    Row, Col,
    Descriptions, DescriptionsItem,
    Progress,
    TypographyTitle, TypographyLink,
    Space,
    Table
} from "ant-design-vue";

import {
    AreaChartOutlined,
    CodeOutlined,
    ApartmentOutlined,
    PlayCircleOutlined,
    ScheduleOutlined
} from "@ant-design/icons-vue";

import LossChart from "@/components/LossChart.vue";

import moment from 'moment';

const ACol = Col;
const AProgress = Progress;
const ATable = Table;

const nodeListColumns = [
    {
        name: 'Address',
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        name: 'Last commit',
        title: 'Last commit',
        dataIndex: 'last_commit',
        key: 'last_commit'
    },
    {
        name: 'Contribution',
        title: 'Contribution',
        dataIndex: 'contribution',
        key: 'contribution'
    },
];

const nodeListData = [
    {
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        last_commit: 1729667463,
        contribution: 0.4
    },
    {
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        last_commit: 1729667463,
        contribution: 0.4
    },
    {
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        last_commit: 1729667463,
        contribution: 0.4
    },
    {
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        last_commit: 1729667463,
        contribution: 0.4
    },
    {
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        last_commit: 1729667463,
        contribution: 0.4
    }
];

const logs = [
    {
        type: 'submit',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 5
    },
    {
        type: 'submit',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 5
    },
    {
        type: 'aggregation',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 5
    },
    {
        type: 'submit',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 4
    },
    {
        type: 'submit',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 4
    },
    {
        type: 'aggregation',
        time: 1729667463,
        address: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        tx_hash: '0xEDa8747bfe3396Aa37c937faF5BB97952cEf3bf2',
        iteration: 4
    }
];

</script>

<template>
<layout :style="{height: '100%'}">
    <layout-header :style="{'background-color': '#2B303B'}">
        <img src="./logo-white.png" alt="Crynux logo" width="40" />&nbsp;&nbsp;&nbsp;&nbsp;Decentralized Training Dashboard
    </layout-header>
    <layout-content style="height:100%">
        <row style="height: 50%">
            <a-col :xs="24" :sm="24" :md="12" :style="{'background': '#29332B', 'padding': '32px'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5">
                        <play-circle-outlined /> Training Task
                    </typography-title>
                    <descriptions bordered size="small" :column="4">
                        <descriptions-item label="Task Type" :span="4">Decentralized Pretraining</descriptions-item>
                        <descriptions-item label="Model Type" :span="2">MusicGen</descriptions-item>
                        <descriptions-item label="Training Type" :span="2">Federated Learning</descriptions-item>
                        <descriptions-item label="Latest Artifact" :span="4">
                            <a href="https://huggingface.co/crynux-ai/fl-music-gen" target="_blank">https://huggingface.co/crynux-ai/fl-music-gen</a>
                        </descriptions-item>
                        <descriptions-item label="Latest Partial" :span="4">2024-10-24 13:17</descriptions-item>
                        <descriptions-item label="Latest Aggregation" :span="4">2024-10-24 13:17</descriptions-item>
                    </descriptions>
                    <space direction="vertical" size="small" style="width: 100%">
                        <typography-title :level="5"><schedule-outlined /> Training Progress (74/100)</typography-title>
                        <a-progress
                            :steps="120"
                            size="small"
                            :stroke-color="'#108ee9'"
                            :percent="70"
                        />
                    </space>
                </space>

            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :style="{'background-color': '#332B2B', 'padding': '32px'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5">
                        <area-chart-outlined /> Model Metrics
                    </typography-title>
                    <loss-chart />
                </space>
            </a-col>
        </row>
        <row style="height: 50%">
            <a-col :xs="24" :sm="24" :md="12" :style="{'background-color': '#302B33', 'padding': '32px'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5"><apartment-outlined /> Participated Nodes</typography-title>
                    <a-table :dataSource="nodeListData" :columns="nodeListColumns" size="small" >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'address'">
                                <typography-link :href="'https://bb.dym.fyi/r/dev-crynux/address/' + record.address" target="_blank">
                                    {{ record.address.substr(0, 10) + '...' + record.address.substr(record.address.length - 10) }}
                                </typography-link>
                            </template>
                            <template v-if="column.key === 'last_commit'">
                                {{ moment.unix(record.last_commit).format('YYYY-MM-DD HH:mm') }}
                            </template>
                            <template v-if="column.key === 'contribution'">
                                {{ record.contribution * 100 }}%
                            </template>
                        </template>
                    </a-table>
                </space>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :style="{'background-color': '#312A24', 'padding': '32px'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5"><code-outlined /> Training Logs</typography-title>
                    <div class="logs">
                        <div v-for="log in logs" style="line-height: 24px">
                            [ {{ moment.unix(log.time).format('YYYY-MM-DD HH:mm') }} ]
                            &nbsp;[ Iter {{ log.iteration }} ]
                            &nbsp;[ Addr <typography-link :href="'https://bb.dym.fyi/r/dev-crynux/address/' + log.address" target="_blank">{{ log.address.substr(0, 6) + '...' + log.address.substr(log.address.length - 6) }}</typography-link> ]
                            &nbsp;[ Tx <typography-link :href="'https://bb.dym.fyi/r/dev-crynux/transaction/' + log.tx_hash" target="_blank">{{ log.tx_hash.substr(0, 6) + '...' + log.tx_hash.substr(log.tx_hash.length - 6) }}</typography-link> ]
                            <span v-if="log.type === 'submit'">Submitted partial gradients</span>
                            <span v-if="log.type === 'aggregation'">Partial gradients aggregated</span>
                        </div>
                    </div>
                </space>
            </a-col>
        </row>
    </layout-content>
</layout>
</template>

<style scoped>

</style>