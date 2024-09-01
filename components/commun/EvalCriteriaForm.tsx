import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useFormik } from "formik"
import { useEffect } from "react"


const EvalCriteriaForm = ({ index, criteria, setCriteria, type }: any) => {

    const formik = useFormik({
        initialValues: {
            ...criteria
        },
        onSubmit: () => { }
    })

    useEffect(() => {
        const ID = criteria?.criterionId
        const criterionName = criteria?.criterionName
        setCriteria((criteria: any) => {
            const copyCriteres = [...criteria]
            copyCriteres[index] = {
                note: formik.values.note,
                appreciation: formik.values.appreciation,
                criterionId: ID,
                criterionName: criterionName
            }

            return copyCriteres
        })
    }, [formik.values])

    return (
        <>
            {criteria && <Box key={criteria?._id} sx={{ marginBottom: '2rem' }}>
                <Typography
                    component='h3'
                    sx={{
                        fontSize: '1.375rem',
                        color: '#05264A',
                        fontWeight: '700',
                        fontFamily: "'Poppins', sans-serif",
                        marginBottom: '1rem',
                        '& span': {
                            fontFamily: "'Arial', sans-serif",
                            fontSize: '1.125rem',
                            fontWeight: '500',
                            color: '#746A6F'
                        }
                    }}
                >
                    Critère {index + 1}: <span>{criteria?.criterionName}</span>
                </Typography>
                <Box sx={{ marginBottom: '1rem' }}>
                    <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                        Note
                    </Typography>
                    <TextField
                        autoComplete='off'
                        type='number'
                        id={`note-${index}`}
                        name={`note`}
                        variant='outlined'
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        error={formik.touched.note && Boolean(formik.errors.note)}
                        sx={{ width: '100%' }}
                        disabled={type || false}
                    />
                </Box>
                <Box sx={{ marginBottom: '1rem' }}>
                    <Typography className='smallinputtitle' sx={{ mb: '5px', ml: '5px' }}>
                        Commentaire
                    </Typography>
                    <TextField
                        autoComplete='off'
                        type='text'
                        id={`appreciation-${index}`}
                        name={`appreciation`}
                        variant='outlined'
                        value={formik.values.appreciation}
                        onChange={formik.handleChange}
                        error={formik.touched.appreciation && Boolean(formik.errors.appreciation)}
                        sx={{ width: '100%' }}
                        disabled={type || false}
                    />
                </Box>
            </Box>}
        </>
    )
}
export default EvalCriteriaForm