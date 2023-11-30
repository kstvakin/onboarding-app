"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {Autocomplete, Box, Button, FormControl, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {Card} from "../register/index";
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { reset } from "../../redux/userSlice";
import {useRouter} from "next/navigation";


const arrayOfUserSectors = (arrayOfData: AxiosResponse<any>[]) => {
    const sector_options: any = arrayOfData[1].data.data;
    const sectors: any = String(arrayOfData[0].data.data.sectors).split(',');

    let array_of_sectors = [];

    for (const sector of sectors) {
        array_of_sectors.push(sector_options.find((o: any) => o.name === sector));
    }

    return array_of_sectors;
};

const Page = () => {
    const router = useRouter();
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
        }
    });

    const [label, setLabel] = useState('');

    const [options, setOptions] = useState([]);

    const user: any = useAppSelector((state) => state.rootReducer);
    const dispatch = useAppDispatch();


    useEffect(() => {

        if(!user.auth.auth){
            router.push('/');
        }else {

            Promise.all([
                axios(`/api/users/${user.auth.id}`),
                axios('/api/sectors')])
                .then(function (responses) {
                    Promise.all(responses)
                        .then(response => {

                            const array_of_sectors: any = arrayOfUserSectors(response);

                            setOptions(response[1].data.data);

                            setFormValues({
                                ...formValues,
                                name: {
                                    ...formValues.name,
                                    value: response[0].data.data.name
                                },
                                sectors: {
                                    ...formValues.sectors,
                                    value: array_of_sectors
                                },
                            });
                        })
                });
        }
    }, [])


    const editFormState = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        }else {
            setLabel('updating');
            await fetch(`/api/users/${user.auth.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            setLabel('updated successfully');

            setTimeout(() => {
                setLabel('');
            }, 2500)
        }
    }

    const logout = () => {
        dispatch(reset());
        router.push('/');
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
                            <Box>
                                <Grid container
                                      spacing={0}
                                      alignItems="center"
                                      justifyContent="center"
                                >
                                    <Grid item>
                                <Image
                                    src="/assets/avatar-profile.svg"
                                    width={100}
                                    height={50}
                                    alt={"profile"}
                                />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <Box component="div" marginBottom={3}>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="standard"
                                            value={formValues.name.value}
                                            name="name"
                                            error={formValues.name.error}
                                            onChange={editFormState}
                                        />
                                    </FormControl>
                                </Box>
                                <Box component="div" marginBottom={3}>
                                    <FormControl fullWidth
                                                 error={formValues.sectors.error}>
                                        <Autocomplete
                                            multiple={true}
                                            id="grouped-demo"
                                            defaultValue={formValues.sectors.value}
                                            value={formValues.sectors.value}
                                            options={options}
                                            groupBy={(option) => option.Sector.name}
                                            getOptionLabel={(option) => option.name}
                                            onChange={onChange}
                                            renderInput={(params) =>
                                                <TextField {...params} label="Sectors"/>}
                                        />
                                        <FormHelperText>{
                                            formValues.sectors.error ? formValues.sectors.errorMessage : ''
                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div">
                                    <Button
                                        variant="outlined"
                                        type='submit'
                                    >Update</Button>
                                    <Button variant="outlined" onClick={logout}>Logout</Button>
                                </Box>
                            </Box>
                            <Box>
                                <Typography
                                    component={"div"}
                                    fontSize={12}
                                    color={'darkred'}
                                    marginY={2}
                                >
                                    {label}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}


export default Page;