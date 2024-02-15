import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { fetchProducts } from "../api/api";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setLoading(false); 
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false); 
      }
    };

    loadProducts();
  }, []);

  const navigateToProductDetails = (productId) => {
    navigation.navigate("ProductDetails", { productId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProductDetails(item.id)}>
      <View style={styles.productCard}>
        <View style={styles.cardContent}>
          <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

 
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5C5C5",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginVertical: 8,
    padding: 16,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productText: {
    flex: 1,
  },
  productTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#000",
    fontSize: 14,
  },
});

export default ProductListScreen;
