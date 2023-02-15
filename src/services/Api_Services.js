import axios from 'axios';
import getAxiosConfig from '../configs/Axios_Config';

const teamlanceApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});


export const GetAllProjectList = (pageSize,pageNo) => {
  let url = `/Projects`;
  let query = `?PageSize=${pageSize}&PageNumber=${pageNo}`;
  return teamlanceApi.get(`${url}${query}`, getAxiosConfig());
};

export const GetProjectCount = () => {
  let url = `/Projects/count`;

  return teamlanceApi.get(`${url}`, getAxiosConfig());
};

export const GetNewHireList = () => {
  let url = `/Projects/new-hire`;

  return teamlanceApi.get(`${url}`, getAxiosConfig());
};


