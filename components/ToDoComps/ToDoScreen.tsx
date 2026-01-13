import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import RoundedRectangle from '../CustomUI/RoundedRectangle/RoundedRectangle';
import CardDisplay from '../CustomUI/CardsDisplay/CardsDisplay';
import Line from '../CustomUI/Line/Line';

const ToDoScreen = () => {
  return (
    <LinearGradient
      colors={['#101010', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.56 }}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <RoundedRectangle
          backgroundColor="#555454"
          radius={20}
          style={{ ...StyleSheet.absoluteFillObject, opacity: 0.25 }}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Good Morning, Suku</Text>
          <Text style={styles.subText}>Sunday, January 10</Text>
        </View>
      </View>

      {/* BOARDS TITLE */}
      <Text style={styles.boardsText}>Boards</Text>
      <Text style={styles.viewAllText}>View All</Text>

      {/* CARDS */}
      <View style={styles.cardsWrapper}>
        <CardDisplay cardCount={8} />
      </View>

      <Line width={'96%'} style={{ alignSelf: 'center' }} thickness={1} />

            {/* BOARDS TITLE */}
      <Text style={styles.DailyTasks}>Daily Tasks</Text>
      <Text style={styles.viewAllTasksText}>View All</Text>

    </LinearGradient>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* HEADER */
  headerWrapper: {
    width: '80%',
    height: 87,
    marginTop: 80, // only affects header
    top: 10,

    alignSelf: 'center', // keep it horizontally centered
    marginLeft: -32,
  },
  headerContent: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'PlayFair',
  },
  subText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'PlayFair',
  },

  /* BOARDS TITLE */
  boardsText: {
    marginTop: 48, // same visual spacing as before
    marginLeft: 32, // same as before
    color: 'white',
    fontSize: 32,
    fontFamily: 'PlayFair',

  },

  DailyTasks: {
    marginTop: 16, // same visual spacing as before
    marginLeft: 32, // same as before
    color: '#101010',
    fontSize: 24,
    fontFamily: 'PlayFair',
  },

  viewAllTasksText: {
    marginRight: 8, // same as before
    color: '#101010',
    fontSize: 16,
    fontFamily: 'PlayFair',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    marginTop: -24, // position it closer to "Boards" text
  },

  viewAllText: {
    marginRight: 8, // same as before
    color: 'white',
    fontSize: 16,
    fontFamily: 'PlayFair',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
    marginTop: -24, // position it closer to "Boards" text
  },

  /* CARDS */
  cardsWrapper: {
    marginTop: 8, // spacing below "Boards" text
    flex: 0.4, // same as original
    backgroundColor: 'transparent',
    paddingRight: 0, // remove right padding for edge-to-edge cards
    paddingLeft: 0, // remove left padding for edge-to-edge cards
  },
});
