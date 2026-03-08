import {
    Component
} from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";

import { DashboardItem } from "./dashboard_item";
import { NumberCard } from "./number_card";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = {
        Layout, DashboardItem, NumberCard
    };
    static props = {
        items: {
            type: Array,
            optional: true
        },
        settings: {
            type: Array,
            optional: true
        },
        stats: {
            type: Object
        }
    }

    setup() {
        this.dashboardItems = useService("dashboard_items")
        this.items = this.props.items || this.dashboardItems.getItems();
        this.stats = this.props.stats;
        this.settings = this.props.settings;
    }
    _setItem(id) {
        return this.settings.indexOf(id) >= 0;
    }
}

registry
    .category("lazy_components")
    .add("awesome_dashboard.AwesomeDashboard", AwesomeDashboard);
