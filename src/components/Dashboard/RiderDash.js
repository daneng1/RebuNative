import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Link, Redirect } from "react-router-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SiteContext } from "../Auth/context";
import axios from "axios";
import exit from "../../../assets/exit.png";
import profile from "../../../assets/profile.png";

export default function RiderDash(props) {
  const context = useContext(SiteContext);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const Item = ({ title }) => <Text>{title}</Text>;

  const renderItem = ({ item }) => <Item title={item.title} />;

  const addTrip = async () => {
    console.log("user id", context.user._id);
    const api = "https://brsmith-auth-api.herokuapp.com/api/v1/trips";
    await axios({
      method: "post",
      url: api,
      data: {
        rider_id: context.user._id,
        start_loc: context.origin,
        end_loc: context.destination,
        init_time: new Date(),
        dropoff_time: "null",
        pickup_time: "null",
        accept_time: "null",
        driver_id: "null",
      },
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log("this is the response", response.data);
        context.setTrip(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <View style={styles.wrapContainer}>
      <Text style={styles.formLabel}>Rider Dashboard</Text>
      <GooglePlacesAutocomplete
        style={styles.input}
        placeholder="Pick up location"
        query={{
          key: "AIzaSyBtLbow5RiE2qmYmc1iqRcQnKnqfLZalKo",
          language: "en",
        }}
        onPress={(data, details = null) => console.log(data.description)}
        onPress={(data, details = null) => context.setOrigin(data.description)}
        onFail={(error) => console.error(error)}
      />
      <GooglePlacesAutocomplete
        style={styles.input}
        placeholder="Where are you going?"
        query={{
          key: "AIzaSyBtLbow5RiE2qmYmc1iqRcQnKnqfLZalKo",
          language: "en",
        }}
        onPress={(data, details = null) => console.log(data.description)}
        onPress={(data, details = null) =>
          context.setDestination(data.description)
        }
        onFail={(error) => console.error(error)}
      />
      <TouchableOpacity style={styles.button} onPress={addTrip}>
        <Text style={{ color: "#00a88a" }}>Schedule pickup</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        ></Text>
      </ScrollView>
      <View style={styles.links}>
        <Link to={"/"}>
          <Image style={styles.exitImg} source={exit} />
        </Link>
        <Link to={"/profile"}>
          <Image style={styles.exitImg} source={profile} />
        </Link>
      </View>
      {context.trip !== null ? (
        <Redirect
          to={{
            pathname: "/trip",
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContainer: {
    marginTop: 100,
    flex: 1,
    backgroundColor: "#00a88a",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
  },
  formLabel: {
    fontSize: 30,
    marginTop: 0,
    marginBottom: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: 235,
    height: 50,
    color: "#5d5d5d",
    fontSize: 16,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    width: 250,
  },
  exitImg: {
    width: 35,
    height: 35,
    alignSelf: "flex-end",
    margin: 20,
  },
  text: {
    fontSize: 25,
    marginBottom: 15,
  },
  links: {
    flexDirection: "row",
  },
});
