<script setup>
import {ConfigProvider, theme} from "ant-design-vue";
import Dashboard from "@/components/Dashboard.vue";
</script>

<template>
    <config-provider
        :theme="{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#e0e0e0'
            }
        }">
        <Dashboard />
    </config-provider>
</template>

<style>
html, body, #app {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
