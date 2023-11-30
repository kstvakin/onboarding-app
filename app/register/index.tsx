'use client'
import {ChangeEvent, useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import {useRouter} from "next/navigation";
import {styled} from "@mui/system";
import {authenticate} from "../../redux/userSlice";
import {useAppDispatch} from "../../redux/hooks";
import axios from "axios";

export const Card = styled('div')({
    color: 'darkslategray',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 4,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    height: '70vh',
});

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [options, setOptions] = useState<any>([]);

    useEffect(() => {
        axios(`/api/sectors`)
            .then(response => {
                console.log(response.data)
                setOptions(response.data.data)
            });

    }, [])

    const [formValues, setFormValues] = useState<any>({
        name: {
            value: '',
            error: false,
            errorMessage: 'This field is required'
        },
        sectors: {
            value: [],
            error: false,
            errorMessage: 'This field is required'
        },
        terms: {
            value: false,
            error: false,
            errorMessage: 'Please check this box if you want to proceed'
        },
    })

    const updateFormState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, checked} = event.target as HTMLInputElement;
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                ...(name === 'terms' ? {value: checked} : {value})
            }
        });
    }

    const onChange = (e: any, value: any) => {
        setFormValues({
            ...formValues,
            sectors: {
                ...formValues['sectors'],
                value
            }
        });
    }

    const isValid = (formValues: any) => {
        const formFields = Object.keys(formValues);
        let newFormValues = {...formValues};
        let errorState = true;

        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;

            if (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0)) {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true
                    }
                }
                errorState = false;
            }
        }

        setFormValues(newFormValues);

        return errorState;
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!isValid(formValues)) {
            return false;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        const data = await res.json();

        dispatch(authenticate(data.data.id))

        router.push(`/profile`);
    }


    return (

        <Grid container
              spacing={0}
              alignItems="center"
              justifyContent="center"
              height={"100vh"}
        >
            <Grid item xs={12} sm={8} paddingX={2}>
                <Card>
                    <Grid container
                          spacing={0}
                          alignItems="center"
                          justifyContent="center"
                          height={'100%'}
                    >
                        <Grid item xs={12} sm={8}>

                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <Typography component={"h2"} fontSize={25}>
                                    Please enter your name and pick the Sectors
                                    you are currently involved in.
                                </Typography>
                                <Box component="div" marginBottom={3}>
                                    <FormControl fullWidth
                                                 error={formValues.name.error}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="standard"
                                            value={formValues.name.value}
                                            name="name"
                                            onChange={updateFormState}
                                        />
                                        <FormHelperText>{

                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div" marginBottom={3}>
                                    <FormControl fullWidth
                                                 error={formValues.sectors.error}>
                                        <Autocomplete
                                            multiple={true}
                                            id="grouped-demo"
                                            value={formValues.sectors.value}
                                            options={options}
                                            groupBy={(option) => option.Sector.name}
                                            getOptionLabel={(option) => option.name}
                                            onChange={onChange}
                                            renderInput={(params) =>
                                                <TextField {...params} label="Sectors"/>}
                                        />
                                        <FormHelperText>{

                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div" marginBottom={3}>
                                    <FormControl fullWidth
                                                 error={formValues.terms.error}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                name="terms"
                                                checked={formValues.terms.value}
                                                onChange={updateFormState}/>
                                        } label="Agree to terms"/>
                                        <FormHelperText>{

                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div">
                                    <Button variant="outlined" type='submit'>Save</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}


export default Page;