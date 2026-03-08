import { Component, useState } from '@odoo/owl';
import { Dialog } from "@web/core/dialog/dialog";
import { useService } from "@web/core/utils/hooks";
import { useChildRef } from "@web/core/utils/hooks";

export class SettingsDialog extends Component {
    static template = "awesome_dashboard.settings_dialog";
    static components = {
        Dialog
    };
    static props = {
        title: {
            type: String
        },
        settings: {
            type: Array
        },
        save: Function
    }

    setup(){
        this.title = this.props.title
        this.dashboardItemsService = useService("dashboard_items");
        this.items = this.dashboardItemsService.getItems();
        this.env.dialogData.dismiss = () => this._dismiss();
        this.modalRef = useChildRef();
        this.data = useState(this.env.dialogData);
        this.settings = this.props.settings;
    }

    _checkbox(e) {
        const val = e.target.getAttribute("descid");
        if(e.target.checked){
            this.settings.push(val)
        }else {
            const idx = this.settings.indexOf(val);
            this.settings.splice(idx, 1);
        }
    }

    _setVal(id) {
        return this.settings.indexOf(id) >= 0;
    }

    _confirm() {
        this.props.save(this.settings);
        this.data.close({dismiss: true});
    }
};
