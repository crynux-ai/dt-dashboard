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
import {computed, onMounted, ref} from "vue";
import taskAPI from "@/api/v1/task.js";

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

const progressSteps = ref(100);
const adjustProgressSteps = () => {
    const width = document.getElementById('progress-wrapper').clientWidth;
        progressSteps.value = Math.ceil(width / 5);
};

const taskInfo = ref({});
const loadTaskInfo = async () => {
    taskInfo.value = await taskAPI.getTaskInfo();
};

const nodeList = ref([]);
const loadNodeList = async () => {
    const resp = await taskAPI.getTaskNodes();
    nodeList.value = resp.nodes;
};

const taskLogs = ref([]);
const loadTaskLogs = async () => {
    const resp = await taskAPI.getTaskLogs();
    taskLogs.value = resp.logs;
};

const metaSpan = ref(2);
const adjustMetaSpan = () => {
    const width = document.getElementById("meta-col").clientWidth;
    if(width <= 660) {
        metaSpan.value = 4;
    } else {
        metaSpan.value = 2;
    }
};

onMounted(async () => {
    window.addEventListener('resize', () => {
        adjustProgressSteps();
        adjustMetaSpan();
    });
    adjustProgressSteps();
    adjustMetaSpan();
    await loadTaskInfo();
    await loadNodeList();
    await loadTaskLogs();
})

</script>

<template>
<layout :style="{height: '100%'}">
    <layout-header :style="{'background-color': '#2B303B'}">
        <img src="./logo-white.png" alt="Crynux logo" width="40" />&nbsp;&nbsp;&nbsp;&nbsp;Decentralized Training Dashboard
    </layout-header>
    <layout-content class="layout-content">
        <row class="layout-row">
            <a-col id="meta-col" class="data-area" :xs="24" :sm="24" :md="24" :lg="12" :style="{'background': '#29332B'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5">
                        <play-circle-outlined /> Training Task
                    </typography-title>
                    <descriptions bordered size="small" :column="4">
                        <descriptions-item label="Task Type" :span="4">Decentralized Pretraining</descriptions-item>
                        <descriptions-item label="Model Type" :span="metaSpan">MusicGen</descriptions-item>
                        <descriptions-item label="Training Type" :span="metaSpan">Federated Learning</descriptions-item>
                        <descriptions-item label="Latest Artifact" :span="4">
                            <a href="https://huggingface.co/crynux-ai/fl-music-gen" target="_blank">https://huggingface.co/crynux-ai/fl-music-gen</a>
                        </descriptions-item>
                        <descriptions-item label="Used dataset samples" :span="4">{{ taskInfo.num_samples }}</descriptions-item>
                        <descriptions-item label="Latest Partial" :span="4">{{ moment.unix(taskInfo.latest_partial_time).format('YYYY-MM-DD HH:mm:ss') }}</descriptions-item>
                        <descriptions-item label="Latest Aggregation" :span="4">{{ moment.unix(taskInfo.latest_aggregation_time).format('YYYY-MM-DD HH:mm:ss') }}</descriptions-item>
                    </descriptions>
                    <space direction="vertical" size="small" style="width: 100%" id="progress-wrapper">
                        <typography-title :level="5"><schedule-outlined /> Training Progress ({{ taskInfo.current_round }}/{{ taskInfo.max_round }})</typography-title>
                        <a-progress
                            :steps="progressSteps"
                            size="small"
                            :stroke-color="'#108ee9'"
                            :percent="taskInfo.current_round * 100 / taskInfo.max_round"
                        />
                    </space>
                </space>
            </a-col>
            <a-col class="data-area" :xs="24" :sm="24" :md="24" :lg="12" :style="{'background-color': '#332B2B'}">
                <typography-title :level="5">
                    <area-chart-outlined /> Model Metrics
                </typography-title>
                <div class="chart-wrapper" id="chart-wrapper">
                    <loss-chart/>
                </div>
            </a-col>
        </row>
        <row class="layout-row">
            <a-col class="data-area" :xs="24" :sm="24" :md="24" :lg="12" :style="{'background-color': '#302B33'}">
                <space direction="vertical" size="large" style="width: 100%">
                    <typography-title :level="5"><apartment-outlined /> Participated Nodes</typography-title>
                    <a-table :dataSource="nodeList" :columns="nodeListColumns" size="small" >
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
                                {{ (record.contribution * 100).toFixed(2) }}%
                            </template>
                        </template>
                    </a-table>
                </space>
            </a-col>
            <a-col class="data-area" :xs="24" :sm="24" :md="24" :lg="12" :style="{'background-color': '#312A24'}">
                <typography-title :level="5"><code-outlined /> Training Logs</typography-title>
                <div class="logs">
                    <div v-for="log in taskLogs" style="line-height: 24px">
                        [ {{ moment.unix(log.time).format('YYYY-MM-DD HH:mm') }} ]
                        &nbsp;[ Iter {{ log.iteration }} ]
                        &nbsp;[ Addr <typography-link :href="'https://bb.dym.fyi/r/dev-crynux/address/' + log.address" target="_blank">{{ log.address.substr(0, 6) + '...' + log.address.substr(log.address.length - 6) }}</typography-link> ]
                        &nbsp;[ Tx <typography-link :href="'https://bb.dym.fyi/r/dev-crynux/tx/' + log.tx_hash" target="_blank">{{ log.tx_hash.substr(0, 6) + '...' + log.tx_hash.substr(log.tx_hash.length - 6) }}</typography-link> ]
                        <span v-if="log.type === 'submit'">Submitted partial gradients</span>
                        <span v-if="log.type === 'aggregation'">Partial gradients aggregated</span>
                    </div>
                </div>
            </a-col>
        </row>
    </layout-content>
</layout>
</template>

<style scoped>
.logs {
    position: absolute;
    left: 32px;
    right: 0;
    bottom: 32px;
    top: 64px;
    overflow: auto;
}
.layout-content {
    height: 100%;
}
.layout-row {
    height: 50%;
}
.data-area {
    padding: 32px;
    height: 100%;
}
#chart-wrapper {
    position: absolute;
    top: 70px;
    bottom: 32px;
    left: 32px;
    right: 32px
}
@media (max-width: 991px) {
    .layout-content {
        height: auto;
    }
    .layout-row {
        height: auto;
    }
    .data-area {
        height: auto;
        min-height: 300px;
    }
}
</style>