import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
// import { memoize } from '@web/core/utils/functions';

const loadStatistics = async () => {
    return await rpc(
        "/awesome_dashboard/statistics"
    );
};

const statService = {
    start(env) {
        return {
            // loadStatistics: memoize(loadStatistics)
            loadStatistics
        };
    },
};

registry.category("services")
.add("stats", statService);
