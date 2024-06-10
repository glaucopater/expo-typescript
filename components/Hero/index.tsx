import { ImageBackground, StyleSheet } from 'react-native';

export const Hero = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/hero.png')}
      resizeMode="cover"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: {
    flex: 1,
    width: '101%',
    backgroundColor: 'rgba(228, 228, 228, 1)',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
  },
  text: {
    color: 'white',
    marginTop: 16,
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
