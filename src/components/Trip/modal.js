import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SiteContext } from "../Auth/context";
import { Redirect } from "react-router-native";

export default function MyModal(props) {
  const context = useContext(SiteContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [redirect, setRedirect] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.message}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#00a88a" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                if (props.reset === true) {
                  context.setComplete(true);
                }
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
        {redirect ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : null}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 30,
    width: 100,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
