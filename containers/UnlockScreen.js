import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { connect } from "react-redux";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";
import Custom_Button from "../components/shared/Custom_Button";
import { authSuccess } from "../actions";

function UnlockScreen({ authenticateUser }) {
  //   const [pressed, setPressed] = useState(false);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [textValue, onChangeText] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: 42 }}>
          <Custom_Button
            text="Enter Pin"
            onPress={() => authenticateUser()}
            color={Colors.secondaryBackground}
            size={14}
            textStyle={{
              letterSpacing: 0.24,
            }}
            style={{
              backgroundColor: Colors.darkRed,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginBottom: 24,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
  authenticateUser: () => dispatch(authSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnlockScreen);
