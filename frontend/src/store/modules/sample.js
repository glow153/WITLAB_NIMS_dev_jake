import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as SampleAPI from 'lib/api/sample';

// action types
const INITIALIZE = 'INITIALIZE';
const LOAD_DATA = 'sample/loadData';


// action creator
export const initialize = createAction(INITIALIZE);
export const loadData = createAction(LOAD_DATA, SampleAPI.loadData);

// initial state
const initialState = Map({
  // data: Map([
  //   List({
  //     _id: "",
  //     datetime: "",
  //     illum: "",
  //     cct: "",
  //     swr: "",
  //     uvi: ""
  //   })
  // ])
    data: Map({
        options: Map({
            chart: Map({
                id: 'sample',
                zoom: {
                  type: 'x',
                  enabled: true
                }
            }),
            legend: Map({
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }),
            xaxis: Map({
                type: 'datetime',
                categories : List([])
            })
        }),
        series: List([
            Map({
                name: 'illum',
                data: List([])
            })
        ])
    })
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: LOAD_DATA,
        onSuccess: (state, action) => {
            const { data } = action.payload;

            const result = state.get('data').toJS();
            result.options.xaxis.categories = data.X;
            result.series[0].data = data.Y;


            return state.set('data', result);
        },
        onFailure: (state, action) => {
            return state.set('error', '로드 실패')
        }
    })
        // [TOGGLE_LOGIN_MODAL]: (state, action) => {
        //   const visible = state.getIn(['modal', 'visible']);
        //   if(visible) {
        //     return state.setIn(['modal', 'visible'], false);
        //   }
        //   return initialState.setIn(['modal', 'visible'], true);
        // },
        // ...pender({
        //     type: CHECK_EMAIL,
        //     onSuccess: (state, action) => {
        //         const { exists } = action.payload.data;
        //         return exists
        //                 ? state.set('error', Map({email: '이미 존재하는 이메일입니다.'}))
        //                 : state;
        //     }
        // })
}, initialState);