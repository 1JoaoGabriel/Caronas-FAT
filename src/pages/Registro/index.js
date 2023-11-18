import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [re_password, setRePassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleRegister = () => {
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
        }
    };
    if (!username || !email || !password || !re_password) {
      setAlertMessage('Por favor, preencha todos os campos.');
      setShowAlert(true);
    } else if (password !== re_password) {
      setAlertMessage('A senha e a confirmação de senha não coincidem.');
      setShowAlert(true);
    } else if (!acceptedTerms) {
      setAlertMessage('Você precisa aceitar os termos e condições.');
      setShowAlert(true);
    } else {
      const data = {
        senha: password,
        re_password: re_password,
        nome: username,
        email: email,
        diretorio: image,
        user: 1,
        placa_carro: '',
        cnh: null,
      };

      axios
        .post('http://127.0.0.1:8000/api/auth/users/', data, config)
        .then((result) =>
          alert('Email de ativação de conta enviado com sucesso! \nPara ativar sua conta, verifique seu email.')
        )
        .catch((error) => console.error(error));
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <View style={styles.imageContainer}>
          <Text style={styles.header}>Registro</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imageButton}
            activeOpacity={0.7} // Feedback visual ao tocar no botão
          >
              {image ? (
                <Image source={{ uri: image }} style={[styles.circularImage, styles.imageWithBorder]} />
              ) : (
                <Image
                  source={require('../../assets/sem_foto.png')}
                  style={[styles.circularImage, styles.imageWithBorder]}
                />
              )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite seu usuário"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <FontAwesome name="user" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite seu email"
            onChangeText={handleEmailChange}
            style={styles.input}
          />
          <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Digite sua senha"
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          {password.length > 0 && (
            <TouchableOpacity
            style={styles.passwordVisibility}
            onPress={() => setShowPassword(!showPassword)}
            >
            </TouchableOpacity>
          )}
          <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
  <Text style={styles.label}>Confirmar Senha</Text>
  <View style={styles.inputBox}>
    <TextInput
      placeholder="Confirme sua senha"
      onChangeText={(text) => setre_password(text)}
      secureTextEntry={!showPassword}
      style={styles.input}
    />
    {password.length > 0 && (
      <TouchableOpacity
        style={styles.passwordVisibility}
        onPress={() => setShowPassword(!showPassword)}
      >
      </TouchableOpacity>
    )}
    <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
  </View>
</View>

    
      <View style={styles.termsCheckBoxContainer}>
        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <FontAwesome
            name={acceptedTerms ? 'check-square' : 'square-o'}
            size={24}
            color={acceptedTerms ? 'black' : 'black'}
            style={styles.checkBoxIcon}
          />
          <Text style={styles.checkBoxLabel}>Eu aceito os termos & condições</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.registerButton}
        activeOpacity={0.7} 
      >

        <Text style={styles.registerButtonText}>Registrar-se</Text>
      </TouchableOpacity>

      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Já possui uma conta?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Alert */}
      <Modal visible={showAlert} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <TouchableWithoutFeedback onPress={closeAlert}>
            <View style={styles.alertContent}>
              <Text style={styles.alertText}>{alertMessage}</Text>
              <TouchableOpacity onPress={closeAlert} style={styles.alertButton}>
                <Text style={styles.alertButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fae8b8',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButton: {
    marginTop: 10,
    marginBottom: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  imageWithBorder: {
    borderWidth: 2,
    borderColor: 'black',
  },
  header: {
    marginVertical: -40,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '95%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputBox: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  passwordVisibility: {
    position: 'absolute',
    right: 10,
  },
  registerButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsCheckBoxContainer: {
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxIcon: {
    marginRight: 10,
  },
  checkBoxLabel: {
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginRight: 10,
  },
  loginLink: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContent: {
    backgroundColor: '#fae8b8',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  alertButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  alertButtonText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  passwordVisibility: {
    marginRight: 10,
  },
});

export default RegisterScreen;
