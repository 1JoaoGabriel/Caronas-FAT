import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.menus}>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem} id="tela1_cel">
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} id="tela2_cel">
            <Text style={styles.navText}>Motoristas</Text>
          </TouchableOpacity>
          <View style={styles.navIndicator}></View>
        </View>
      </View>

      <View style={styles.menu1}>
        <View style={styles.rodapeMenu1}>
          <View style={styles.day}>
            <View style={styles.selectBox1}>
              {/* Opções de Dia */}
              <View style={styles.option1}>
                <TextInput style={styles.radio} id="segunda" value="Segunda" name="category" />
                <Text for="segunda">Segunda</Text>
              </View>
              {/* Adicione as outras opções de dia aqui */}
              <View style={styles.selected1}>
                <Text>Selecione o Dia p/ Sua Carona!</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerCarRegister}>
            <TouchableOpacity style={styles.carRegisterButton} id="Caroneiro">
              <Text style={styles.caroneiroText}>Quero Ser Caroneiro!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Continue adicionando outras seções e estilizações aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fae8b8',
    },
  menus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nav: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    width: '80%', // Defina a largura do menu
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  navIndicator: {
    width: '25%',
    height: 2,
    backgroundColor: '#1976D2',
  },
  menu1: {
    // Estilos para o Menu 1
    marginBottom: 20,
  },
  rodapeMenu1: {
    // Estilos para o Rodapé do Menu 1
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  day: {
    // Estilos para a seção "Day"
    marginBottom: 20,
  },
  selectBox1: {
    // Estilos para o seletor
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionsContainer: {
    // Estilos para o container de opções
  },
  option1: {
    // Estilos para as opções
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  selected1: {
    // Estilos para o texto "Selecione o Dia..."
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  containerCarRegister: {
    // Estilos para o container do botão "Quero Ser Caroneiro!"
    alignItems: 'center',
  },
  carRegisterButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  caroneiroText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  // Continue definindo estilos para outras seções e elementos conforme necessário
});

export default Dashboard;

//shadowColor: '#000',
//shadowOffset: {
 // width: 0,
  //height: 2,
//},
//shadowOpacity: 0.25,
//shadowRadius: 3.84,
//elevation: 5, 
