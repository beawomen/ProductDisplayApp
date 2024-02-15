import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProductDetails } from '../api/api';

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [productId]);

  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>
      <Text style={styles.productBrand}>Brand: {product.brand}</Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5C5C5", 
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', 
    backgroundColor: "grey",
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#000', 
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', 
  },
  productBrand: {
    fontSize: 16,
    color: '#000', 
    marginTop: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#000', 
    marginTop: 8,
  },
});

export default ProductDetailsScreen;
