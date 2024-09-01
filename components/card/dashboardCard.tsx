import { Box, Typography } from "@mui/material"


const DashboardCard = ({title, value, icon}: any) => {
    return(
        <Box className='DashboardCard'>
            <Box className='DashboardCard__body'>
                <Typography component='h2' className='DashboardCard__title'>{title}</Typography>
                <Typography component='p' className='DashboardCard__value'>{value}</Typography>
            </Box>
            <Box className='DashboardCard__icon'>
                {icon}
            </Box>
        </Box>
    )
}
export default DashboardCard