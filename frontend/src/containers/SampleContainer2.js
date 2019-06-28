import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sampleActions from 'store/modules/sample';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';

class Sample extends Component {

    constructor(props) {
        super(props);
        sampleActions.initialize();

        this.state = {
            left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax+1',
            bottom: 'dataMin-1',
            top2: 'dataMax+20',
            bottom2: 'dataMin-20',
            animation: true,
        };
    }

    componentDidMount() {
        this.handleLoadData();
    }

    handleLoadData = async () => {
        const { SampleActions } = this.props;
        let attribs = ['illum', 'cct', 'swr', 'uvi'];
        await SampleActions.loadData("2017-04-12 00:00", "2017-04-12 24:00", attribs);
        console.log(this.props.data.toJS());
    }

    getAxisYDomain = (from, to, ref, offset) => {
        const { data } = this.props;
        const refData = data.toJS().slice(from - 1, to);
        let [bottom, top] = [refData[0][ref], refData[0][ref]];
        refData.forEach((d) => {
          if (d[ref] > top) top = d[ref];
          if (d[ref] < bottom) bottom = d[ref];
        });
      
        return [(bottom | 0) - offset, (top | 0) + offset];
    };

    
    zoom() {
        const { data } = this.props;
        let { refAreaLeft, refAreaRight } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
        }));
        return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
        const [bottom2, top2] = this.getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50);

        this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
        bottom2,
        top2,
        }));
    }

    zoomOut() {
        const { data } = this.state;
        this.setState(() => ({
        data: data.slice(),
        refAreaLeft: '',
        refAreaRight: '',
        left: 'dataMin',
        right: 'dataMax',
        top: 'dataMax+1',
        bottom: 'dataMin',
        top2: 'dataMax+50',
        bottom2: 'dataMin+50'
        }));
    }
      

    render() {
        const { data } = this.props;
        const {
          left, right, refAreaLeft, refAreaRight, top, bottom, top2, bottom2,
        } = this.state;

        return (
            <div>
                <button href="" className="btn update" onClick={this.zoomOut.bind(this)}>Zoom Out</button>
                <LineChart
                    width={1024}
                    height={768}
                    data={data.toJS()}
                    onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
                    onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
                    onMouseUp={this.zoom.bind(this)}
                  
                    margin={{
                        top: 5, right: 30, left: 200, bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  allowDataOverflow
                  dataKey="datetime"
                  domain={[left, right]}
                />
                <YAxis
                  allowDataOverflow
                  domain={[bottom, top]}
                  type="number"
                  yAxisId="1"
                />
                <YAxis
                  orientation="right"
                  allowDataOverflow
                  domain={[bottom2, top2]}
                  type="number"
                  yAxisId="2"
                />
                <Tooltip />
                <Line yAxisId="1" type="natural" dataKey="illum" stroke="#8884d8" animationDuration={300} />
                <Line yAxisId="2" type="natural" dataKey="uvi" stroke="#82ca9d" animationDuration={300} />
      
                {
                  (refAreaLeft && refAreaRight) ? (
                    <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                  }
                </LineChart>
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
