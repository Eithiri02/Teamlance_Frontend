import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Colors from '../../assets/styles/js/Color';
import { TableWrapper } from '../_common';
import { Project_Table_Header } from 'const/Table_Header_Menus';
import { GetAllProjectList, GetProjectCount, GetNewHireList } from '../../services/Api_Services';
import { useNavigate } from 'react-router-dom';
import CUSTOM_ICON_PACK from 'const/Icon_packs';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export { Projects };

function Projects() {

    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        columns: Project_Table_Header,
        total: 0,
        pageSize: 5,
        pageNo: 1,
    });
    const [projectCountList, setProjectCountList] = useState([]);
    const [newHireCount, setNewHireCount] = useState(0);

    useEffect(() => {

        async function saveApiData() {
            setPageState(old => ({ ...old, isLoading: true }))
            const projectL = await handleGetAllProjectList(pageState.pageSize, pageState.pageNo);
            const countList = await handleGetProjectCount();
            const newHireCount = await handleGetNewHireList();

            setProjectCountList(countList);
            setNewHireCount(newHireCount);
            setPageState(old => ({ ...old, isLoading: false, data: projectL.data, total: projectL.totalCount }))
        }
        saveApiData();

    }, []);

    useEffect(() => {

        async function saveApiData() {
            setPageState(old => ({ ...old, isLoading: true }))
            const projectL = await handleGetAllProjectList(pageState.pageSize, pageState.pageNo);
            
            setPageState(old => ({ ...old, isLoading: false, data: projectL.data, total: projectL.totalCount }))
        }
        saveApiData();

    }, [pageState.pageNo,pageState.pageSize]);

    const handleGetAllProjectList = async (pageS, pageN) => {

        try {
            const response = await GetAllProjectList(pageS, pageN);

            return response.data;

        } catch (error) {
            alert("something went wrong !")
            //navigate("/")
            console.log("error", error)
            console.error(error);
        }
    };

    const handleGetProjectCount = async () => {
        try {

            const response = await GetProjectCount();
            return response.data;

        } catch (error) {
            //alert("something went wrong !")
            //navigate("/")
            console.log("error", error)
            console.error(error);
        }
    };

    const handleGetNewHireList = async () => {
        try {

            const response = await GetNewHireList();
            return response.data;

        } catch (error) {
            //alert("something went wrong !")
            //navigate("/")
            console.log("error", error)
            console.error(error);
        }
    };

    const itemLableList = [
        {
            type: 'open',
            label: 'Open project',
            bgColor: '#72DFD0',
        },
        {
            type: 'inprogress',
            label: 'Ongoing project',
            bgColor: "#6799DE",
        },
        {
            type: 'delay',
            label: 'Project with delay',
            bgColor: "#306BAC",
        },
        {
            type: 'newhire',
            label: 'New hires this week',
            bgColor: "#00417C",
        }
    ];


    return (
        <div>
            <Box className="component-title">Projects</Box>
            <Box className="outlet-box">
                <Box className="card-list-form">
                    <Grid className="card-list-container" container>
                        {
                            itemLableList.length !== 0 && (
                                itemLableList.map((item, indInd) =>
                                    <Grid item key={indInd} xs={2.5}>
                                        <Box className="card-item" sx={{ backgroundColor: `${item.bgColor}`}}>
                                            <Box className="item-icon">{CUSTOM_ICON_PACK.bookmark}</Box>
                                            <Box className="card-text-container" sx={{ display: 'flex', margin: '5px 1rem 1rem 1rem' }}>
                                                <Typography className="count">
                                                    {
                                                        item.type === "newhire" ?
                                                            newHireCount.count
                                                            :
                                                            projectCountList.filter(label => label.category === item.type)[0] !== undefined ? projectCountList.filter(label => label.category === item.type)[0].count : 0
                                                    }
                                                </Typography>
                                                <Typography className="label" >
                                                    {item.label}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            )
                        }

                    </Grid>

                </Box>
                <TableWrapper pageState={pageState} setPageState={setPageState} />
            </Box>
        </div>
    );
}
