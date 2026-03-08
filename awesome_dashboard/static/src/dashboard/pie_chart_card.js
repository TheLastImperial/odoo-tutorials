import {
    Component, onWillStart, useRef,
    onMounted, onWillUnmount, onWillUpdateProps
} from "@odoo/owl";

import { loadJS } from "@web/core/assets";

export class PieChartCard extends Component {
    static template = "awesome_dashboard.pie_chart_card";
    static props = {
        id: {
            type: String,
            optional: true
        },
        title: {
            type: String,
            optional: true
        },
        value: {
            type: Object
        }
    }
    setup() {
        this.id = this.props.id;
        this.title = this.props.title;
        this.stats = this.props.value;

        this.chartRef = useRef('canvas');
        this.chart = null;
        onWillStart(async () => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        });
        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
        onMounted( async () => {
            this.renderChart()
        });

        onWillUpdateProps(nextProps => {
            this.stats = nextProps.value;
            this.renderChart();
        });
    }

    renderChart() {
        if(this.chart)
            this.chart.destroy()
        const keys = Object.keys(this.stats)
        const values = Object.values(this.stats)
        this.chart = new Chart(this.chartRef.el, {
            type: 'pie',
            data: {
                labels: keys,
                datasets:[{
                    data: values
                }]
            }
        });
    }
}
