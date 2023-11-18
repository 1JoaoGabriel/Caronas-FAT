import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CreateCarpool from '../CreateCarpool';

const Motoristas = () => {
  const [showCreateCarpool, setShowCreateCarpool] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [caronaAceita, setCaronaAceita] = useState(null);
  const [numeroAceitacoes, setNumeroAceitacoes] = useState(0);
  const [caronaCheia, setCaronaCheia] = useState(false);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get('sua_url_da_api_aqui');
        if (response.status === 200) {
          const data = response.data;
          if (data.length > 0) {
            setSelectedDriver(data[0]);
          }
        } else {
          throw new Error('Erro ao buscar dados da API');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDriverData();
  }, []);

  const handleCreateCarpool = (carona) => {
    setShowCreateCarpool(true);
    setCaronaAceita();
  };

  const handleCriarCarona = (carona) => {
    setShowCreateCarpool(false);
    setSelectedDriver({ ...selectedDriver, caronaInfo: carona });
  };

  const handleAceitarCarona = () => {
    if (!caronaCheia && numeroAceitacoes < 4) {
      setTimeout(() => {
        setNumeroAceitacoes(numeroAceitacoes + 1);

        if (numeroAceitacoes === 3) {
          setCaronaCheia(true);
        }
      }, 1000);
    } else {
      alert('Carona cheia!');
    }
  };

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Caronas</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateCarpool}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {showCreateCarpool ? (
          <CreateCarpool onCaronaCriada={handleCriarCarona} />
        ) : (
          <>
            {drivers.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSelectDriver(item)}
              >
                <View style={styles.driverInfoContainer}>
                  {selectedDriver === item && (
                    <View style={styles.informacoesCarona}>
                      <Image
                        source={{ uri: item.imageURL }}
                        style={styles.driverImage}
                      />
                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.value}>{item.name}</Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Placa do Carro:</Text>
                        <Text style={styles.value}>{item.carPlate}</Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Destino:</Text>
                        <Text style={styles.value}>{item.caronaInfo.destino}</Text>
                      </View>

                      <View style={styles.infoRow}>
                        <Text style={styles.label}>Horário:</Text>
                        <Text style={styles.value}>{item.caronaInfo.horaPartida}</Text>
                      </View>
                      {caronaAceita ? (
                        <Text>Carona Aceita!</Text>
                      ) : (
                        <TouchableOpacity
                          onPress={handleAceitarCarona}
                          style={[styles.button, caronaCheia && styles.buttonDisabled]}
                          disabled={caronaCheia}
                        >
                          <Text style={styles.buttonText}>
                            {caronaCheia ? 'Carona Cheia' : 'Aceitar Carona'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAE8B8',
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  addButton: {
    backgroundColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 15,
  },
  driverInfoContainer: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
  },
  informacoesCarona: {
    marginTop: -15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    width: 100,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
    marginTop: 8,
    marginLeft: -30,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  driverImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Motoristas;
