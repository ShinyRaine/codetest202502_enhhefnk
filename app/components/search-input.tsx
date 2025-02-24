import { Button, Grid2 as Grid, TextField } from "@mui/material";
import Form from "next/form";
import { getAllCategories, getAllDeliveries, getAllInstitutes, getAllLanguages, getAllLocations } from "../actions/course";
import FormSelect from "./select";
import SaveSearchButton from "./save-search-button";

export default async function SearchInput({
  initialVals
}: {
  initialVals?: {
    text: string,
    category: number,
    deliveryMethod: number,
    institute: number,
    language: number,
    location: number,
  }
}) {
  const categories = await getAllCategories()
  const deliveryMethods = await getAllDeliveries()
  const institutes = await getAllInstitutes()
  const languages = await getAllLanguages()
  const locations = await getAllLocations()

  return (
    <Form action={"/search"} style={{width: '100%'}}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <FormSelect name="language" label="Language"
            defaultValue={initialVals?.language} list={languages} />
        </Grid>
        <Grid size={3}>
          <FormSelect name="category" label="Category" sx={{width: '100%'}}
            defaultValue={initialVals?.category} list={categories} />
        </Grid>
        <Grid size={6}>
          <TextField variant="standard" sx={{width: '100%'}} 
            defaultValue={initialVals?.text} label="Search for Courses" placeholder="Name" name="text"/>
        </Grid>
        <Grid size={3}>
          <FormSelect name="deliveryMethod" label="Delivery Method"
            defaultValue={initialVals?.deliveryMethod} list={deliveryMethods} />
        </Grid>
        <Grid size={3}>
          <FormSelect name="institute" label="Institutes"
            defaultValue={initialVals?.institute} list={institutes} />
        </Grid>
        <Grid size={3}>
          <FormSelect name="location" label="Location"
            defaultValue={initialVals?.location} list={locations} />
        </Grid>
        <Grid size={3} sx={{alignContent: 'end', display: 'flex', alignItems: 'end', gap: '4px'}}>
          <Button variant="contained" type="submit">Search</Button>
          {initialVals ? <SaveSearchButton /> : null}
        </Grid>
      </Grid>
    </Form>
  )
}
