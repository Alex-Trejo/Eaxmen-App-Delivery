import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

export default function OrderMotor() {
  const [selectedFilter, setSelectedFilter] = useState('Libre');
  const [pedidos, setPedidos] = useState([
    { id: '1', estado: 'Libre', descripcion: 'Pedido 1', detalles: 'Detalles del pedido 1' },
    { id: '2', estado: 'En Proceso', descripcion: 'Pedido 2', detalles: 'Detalles del pedido 2' },
    { id: '3', estado: 'Completados', descripcion: 'Pedido 3', detalles: 'Detalles del pedido 3' },
    { id: '4', estado: 'Libre', descripcion: 'Pedido 4', detalles: 'Detalles del pedido 4' },
    { id: '5', estado: 'En Proceso', descripcion: 'Pedido 5', detalles: 'Detalles del pedido 5' },
  ]);
  const [expandedPedidos, setExpandedPedidos] = useState({});

  const filteredPedidos = pedidos.filter(pedido => pedido.estado === selectedFilter);

  const togglePedidoExpansion = (pedidoId) => {
    setExpandedPedidos(prevState => ({
      ...prevState,
      [pedidoId]: !prevState[pedidoId]
    }));
  };

  const changeEstadoPedido = (pedidoId) => {
    setPedidos(prevPedidos =>
      prevPedidos.map(pedido =>
        pedido.id === pedidoId
          ? {
              ...pedido,
              estado:
                pedido.estado === 'Libre'
                  ? 'En Proceso'
                  : pedido.estado === 'En Proceso'
                  ? 'Completados'
                  : pedido.estado,
            }
          : pedido
      )
    );
  };

  const deletePedido = (pedidoId) => {
    setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== pedidoId));
  };

  const renderPedido = ({ item }) => (
    <View style={styles.pedidoItem}>
      <TouchableOpacity onPress={() => togglePedidoExpansion(item.id)}>
        <View style={styles.pedidoContent}>
          <Text style={styles.pedidoDescripcion}>{item.descripcion}</Text>
          <Icon
            name={expandedPedidos[item.id] ? "chevron-up" : "chevron-down"}
            size={24}
            color="#000"
          />
        </View>
      </TouchableOpacity>
      {expandedPedidos[item.id] && (
        <View style={styles.pedidoDetalles}>
          <Text>{item.detalles}</Text>
          {item.estado !== 'Completados' && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => changeEstadoPedido(item.id)}>
                <Icon name="checkmark" size={24} color="#00ff00" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.negativeButton} onPress={() => deletePedido(item.id)}>
                <Icon name="close" size={24} color="#ff0000" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Libre' && styles.filterButtonSelected,
          ]}
          onPress={() => setSelectedFilter('Libre')}
        >
          <Text style={styles.filterButtonText}>Libre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'En Proceso' && styles.filterButtonSelected,
          ]}
          onPress={() => setSelectedFilter('En Proceso')}
        >
          <Text style={styles.filterButtonText}>En Proceso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === 'Completados' && styles.filterButtonSelected,
          ]}
          onPress={() => setSelectedFilter('Completados')}
        >
          <Text style={styles.filterButtonText}>Completados</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredPedidos}
          renderItem={renderPedido}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No hay pedidos en esta categoría.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  marcianito: {
    width: 100, // Ajusta el tamaño según sea necesario
    height: 100, // Ajusta el tamaño según sea necesario
    alignSelf: 'center', // Centra la animación
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filterButtonSelected: {
    backgroundColor: '#d0d0d0',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  pedidoItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pedidoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pedidoDescripcion: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  dropdownButton: {
    padding: 10,
  },
  pedidoDetalles: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    marginLeft: 10,
  },
  negativeButton: {
    backgroundColor: '#ffcccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
