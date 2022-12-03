import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (res?.status === 200) {
          setData(res.data);
        } else {
          console.log("An Error Occured");
        }
      } catch (error) {
        console.error(error.res);
      }
    };
    data();
  }, []);
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Form data={data} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {data === null ? "Loading..." : <Map data={data} />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
