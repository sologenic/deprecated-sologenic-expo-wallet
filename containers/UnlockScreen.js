import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Custom_Text from "../components/shared/Custom_Text";
import Custom_Header from "../components/shared/Custom_Header";
import Custom_HeaderTitle from "../components/shared/Custom_HeaderTitle";
import Custom_HeaderButton from "../components/shared/Custom_HeaderButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import Images from "../constants/Images";

export default function UnlockScreen({ navigation }) {
  //   const [pressed, setPressed] = useState(false);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [textValue, onChangeText] = useState("");
  return (
    <View style={styles.container}>
      <Custom_Header
        left={
          <Custom_HeaderButton
            onPress={() => {
              console.log("Press!!");
            }}
            type="icon"
            icon="md-arrow-back"
            iconColor={Colors.text}
          />
        }
        center={<Custom_HeaderTitle text="Enable Face ID" />}
        right={
          <Custom_HeaderButton
            onPress={() => {
              console.log("Press!!");
            }}
            type="icon"
            icon="md-settings"
            iconColor={Colors.text}
          />
        }
      />
      <ScrollView>
        <View>
          <Custom_Text
            value="This is custom text component."
            size={Fonts.size.medium}
            style={{ marginVertical: 50, marginHorizontal: 10 }}
            isBold
            color={Colors.text}
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
