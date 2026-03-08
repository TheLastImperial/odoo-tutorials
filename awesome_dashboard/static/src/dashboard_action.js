import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, useRef } from '@odoo/owl';
import { AwesomeDashboard } from './dashboard/dashboard';
import { LazyComponent } from '@web/core/assets';

import { useService } from "@web/core/utils/hooks";
import { NumberCard } from "./dashboard/number_card";
import { PieChartCard } from "./dashboard/pie_chart_card";
import { items } from "./dashboard_items";
import { SettingsDialog } from "./settings_dialog";

export class DashboardAction extends Component {
    static template = "awesome_dashboard.dashboard_action"
    static components = {
        AwesomeDashboard, LazyComponent, NumberCard, PieChartCard
    };

    setup() {
        this.stats = useState({
            average_quantity: 0,
            average_time: 0,
            nb_cancelled_orders: 0,
            nb_new_orders: 0,
            orders_by_size: {
                m: 0, s: 0, xl: 0
            },
            total_amount: 0
        });
        this.settingsModal = useRef("settingsModal")
        this.loadStatistics = useService("stats").loadStatistics
        this.dialog = useService("dialog");
        this.action = useService("action");
        this.items = items

        onWillStart(async () => {
            this.setStats(await this.loadStatistics())
        });
        this.to = null;
        const settings = localStorage.getItem('settings');

        if(!!settings) {
            this.settings = useState([])            
        }else{
            this.settings = useState(JSON.parse(settings))
        }
    }

    clickCustomers(){
        this.action.doAction("base.action_partner_form");
    }

    clickLeads() {
        // Open Invoice
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t('Journal Entry'),
            target: 'current',
            res_id: 1,
            res_model: 'account.move',
            views: [[false, 'form']],
        });
    }
    setAutoupdate(ev) {
        if(ev.target.checked){
            this.to = setInterval(async ()=>{
                const stats = await this.loadStatistics();
                this.setStats(stats)
            }, 2000);
        }else{
            clearInterval(this.to);
        }
    }
    setStats(response) {
        if(response === undefined)
            return
        if(this.stats == undefined){
            return
        }

        this.stats.average_quantity = response.average_quantity;
        this.stats.average_time = response.average_time;
        this.stats.nb_cancelled_orders = response.nb_cancelled_orders;
        this.stats.nb_new_orders = response.nb_new_orders;
        this.stats.orders_by_size = response.orders_by_size;
        this.stats.total_amount = response.total_amount;
    }

    _saveSettings(settings) {
        this.settings = settings;
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    openSettings() {
        this.dialog.add(SettingsDialog, {
            title: "Dashboard items settings",
            settings: this.settings,
            save: this._saveSettings
        })
    }
};

registry.category("actions")
.add("awesome_dashboard.dashboard", DashboardAction);
