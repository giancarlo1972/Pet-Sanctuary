import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Heart, MapPin, Filter } from 'lucide-react-native';
import { Colors, Gradients } from '@/constants/Colors';
import { Fonts, FontSizes } from '@/constants/Fonts';
import { mockPets } from '@/constants/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (petId: string) => {
    setFavorites(prev =>
      prev.includes(petId)
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const renderPetCard = (pet: any) => (
    <TouchableOpacity
      key={pet.id}
      style={styles.petCard}
      onPress={() => router.push(`/pet-details?id=${pet.id}`)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: pet.photos[0] }} style={styles.petImage} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(pet.id)}
      >
        <Heart
          color={favorites.includes(pet.id) ? Colors.error : Colors.white}
          size={20}
          fill={favorites.includes(pet.id) ? Colors.error : 'none'}
        />
      </TouchableOpacity>
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed}</Text>
        <View style={styles.petMetadata}>
          <View style={styles.locationContainer}>
            <MapPin color={Colors.textSecondary} size={14} />
            <Text style={styles.locationText}>{pet.location.address}</Text>
          </View>
          <Text style={styles.ageText}>{pet.age} years old</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFeaturedPet = (pet: any) => (
    <TouchableOpacity
      key={pet.id}
      style={styles.featuredCard}
      onPress={() => router.push(`/pet-details?id=${pet.id}`)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: pet.photos[0] }} style={styles.featuredImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.featuredGradient}
      >
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredName}>{pet.name}</Text>
          <Text style={styles.featuredBreed}>{pet.breed}</Text>
          <View style={styles.featuredLocation}>
            <MapPin color={Colors.white} size={16} />
            <Text style={styles.featuredLocationText}>{pet.location.address}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.title}>Pet Sanctuary</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color={Colors.primary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Pets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Sanctuary Pets</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {mockPets.slice(0, 3).map(renderFeaturedPet)}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>🐕</Text>
              <Text style={styles.categoryText}>Dogs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>🐱</Text>
              <Text style={styles.categoryText}>Cats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>🐰</Text>
              <Text style={styles.categoryText}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Pets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pets Near You</Text>
          <View style={styles.petsGrid}>
            {mockPets.map(renderPetCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginTop: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featuredContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featuredCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  featuredInfo: {
    gap: 4,
  },
  featuredName: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
  featuredBreed: {
    fontSize: FontSizes.md,
    fontFamily: Fonts.regular,
    color: Colors.white,
    opacity: 0.9,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  featuredLocationText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.regular,
    color: Colors.white,
    opacity: 0.8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    gap: 8,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryText: {
    fontSize: FontSizes.md,
    fontFamily: Fonts.semibold,
    color: Colors.text,
  },
  petsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  petCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petImage: {
    width: '100%',
    height: 140,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInfo: {
    padding: 12,
    gap: 4,
  },
  petName: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  petBreed: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  petMetadata: {
    marginTop: 8,
    gap: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    flex: 1,
  },
  ageText: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
});