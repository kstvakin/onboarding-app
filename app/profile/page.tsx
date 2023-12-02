"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {Autocomplete, Box, Button, FormControl, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";
import {Card} from "../register/index";
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {reset} from "../../redux/userSlice";
import {useRouter} from "next/navigation";
import {LoadingButton} from "@mui/lab";


const arrayOfUserSectors = (arrayOfData: AxiosResponse<any>[]) => {
    const sector_options: any = arrayOfData[1].data.data;
    const sectors: any = String(arrayOfData[0].data.data.sectors).split(',');

    let array_of_sectors = [];

    for (const sector of sectors) {
        array_of_sectors.push(sector_options.find((o: any) => o.name === sector));
    }

    return array_of_sectors;
};

type Effects = {
    loading: boolean,
    label: string
}

type User = {
    auth: Record<string, any>
}

type FormValueType = {
    name: FormValueTypeProps,
    sectors: FormValueTypeProps
}

type FormValueTypeProps = {
    value: string | any[],
    error: boolean,
    errorMessage: string
}

async function loadData(user: User) {
    const responses = await Promise.all([
        axios(`/api/users/${user.auth.id}`),
        axios('/api/sectors')]);

    const response = await Promise.all(responses);

    return {
        arrayOfUserSectors: arrayOfUserSectors(response),
        response,
    };
}

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

    const [effect, setEffect] = useState<Effects>({
        loading: false,
        label: ''
    });

    const [options, setOptions] = useState([]);

    const user: User = useAppSelector((state) => state.rootReducer) as User;
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!user.auth.auth) {
            router.push('/');
        } else {
            loadData(user)
                .then((result) => {
                    setOptions(result.response[1].data.data);

                    setFormValues((prevState: FormValueType) => {
                        prevState.name.value = result.response[0].data.data.name;
                        prevState.sectors.value = result.arrayOfUserSectors;
                        return prevState;
                    })
                }).catch(e => console.error(e));
        }
    }, [user, router])


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

    const changeSectors = (e: any, value: any) => {
        setFormValues({
            ...formValues,
            sectors: {
                ...formValues['sectors'],
                value
            }
        });
    }

    const isValid = (formValues: any) => {
        try {
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
                }else{
                    newFormValues = {
                        ...newFormValues,
                        [currentField]: {
                            ...newFormValues[currentField],
                            error: false
                        }
                    }
                }
            }

            setFormValues(newFormValues);

            return errorState;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const handleSubmit = async (event: any) => {
        try {
            event.preventDefault();
            if (!isValid(formValues)) {
                return false;
            } else {
                setEffect({
                    ...effect,
                    loading: true
                });

                await fetch(`/api/users/${user.auth.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                setEffect({
                    ...effect,
                    loading: false,
                    label: 'updated successfully'
                });

                setTimeout(() => {
                    setEffect({
                        ...effect,
                        label: ''
                    });
                }, 2500)
            }
        } catch (e) {
            console.error(e);
            setEffect({
                ...effect,
                loading: false
            });
        }
    }

    const logout = () => {
        dispatch(reset());
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
                                    <FormControl
                                        fullWidth
                                        error={formValues.name.error}
                                    >
                                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="standard"
                                            value={formValues.name.value}
                                            name="name"
                                            error={formValues.name.error}
                                            onChange={editFormState}
                                        />
                                        <FormHelperText sx={{marginLeft: 0}}>{
                                            String(formValues.name.error) === 'true' ?
                                                formValues.name.errorMessage : ''
                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div" marginBottom={3}>
                                    <FormControl
                                        fullWidth
                                        error={formValues.sectors.error}
                                    >
                                        <Autocomplete
                                            multiple={true}
                                            id="grouped-demo"
                                            defaultValue={formValues.sectors.value}
                                            value={formValues.sectors.value}
                                            options={options}
                                            groupBy={(option) => option.Sector.name}
                                            getOptionLabel={(option) => option.name}
                                            onChange={changeSectors}
                                            renderInput={(params) =>
                                                <TextField {...params} label="Sectors"/>}
                                        />
                                        <FormHelperText sx={{marginLeft: 0}}>{
                                            String(formValues.sectors.error) === 'true' ?
                                                formValues.sectors.errorMessage : ''
                                        }</FormHelperText>
                                    </FormControl>
                                </Box>
                                <Box component="div" sx={{marginBottom: 2, position: 'relative'}}>
                                    <LoadingButton
                                        variant="outlined"
                                        type='submit'
                                        loading={effect.loading}
                                        sx={{
                                            marginRight: 2
                                        }}
                                    >
                                        Update
                                    </LoadingButton>
                                    <Button
                                        variant="outlined"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                    <Box sx={{position: 'absolute', top: '100%'}}>
                                        <Typography
                                            component={"div"}
                                            fontSize={12}
                                            color={'darkred'}
                                            sx={{marginTop: 0.5}}
                                        >
                                            {effect.label}
                                        </Typography>
                                    </Box>
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