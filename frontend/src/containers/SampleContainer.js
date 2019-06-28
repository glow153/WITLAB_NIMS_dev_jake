import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sampleActions from 'store/modules/sample';

import ReactApexChart from 'react-apexcharts';

class Sample extends Component {

    componentDidMount() {
        this.handleLoadData();
    }

    handleLoadData = async () => {
        const { SampleActions } = this.props;
        let attribs = ['illum', 'cct', 'swr', 'uvi'];
        await SampleActions.loadData("2017-04-12 05:00", "2017-04-12 20:00", attribs);
    }

    render() {
        const { data, children } = this.props;

        const month = [];
        for(let i=1; i<13; i++) {
            month.push(i);
        }

        const date = [];
        for(let i=1; i<32; i++) {
            date.push(i);
        }

        return (
            <div>
            {
                (data.options && data.series) ?
                ( <ReactApexChart options={data.options} series={data.series} type="line" height="720" /> ) : null
            }
            </div>
        );
    }
}

export default connect(
    (state) => ({
        data: state.sample.get('data')
    }),
    (dispatch) => ({
        SampleActions: bindActionCreators(sampleActions, dispatch)
    })
)(Sample);
