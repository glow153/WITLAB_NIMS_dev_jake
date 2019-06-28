import axios from 'axios';

export const loadData = (dt_start, dt_end, attribs
) => axios.post('/api/cas/loaddata', {
    'dt_start': dt_start,
    'dt_end': dt_end,
    'attribs': attribs});