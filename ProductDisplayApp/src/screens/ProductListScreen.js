import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { fetchProducts } from "../api/api";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
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
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
  },
  productCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 16,
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
});

export default ProductListScreen;
