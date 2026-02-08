import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/product.interface';


@Component({
  selector: 'app-shop',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');
  

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Roundup Weed and Grass Killer4 with Comfort Wand, For Flower Beds and Trees, 1 gal.',
      category: 'Fungicide',
      price: 18.50,
      rating: 4.8,
      inStock: true,
      isOrganic: true,
      description: 'Effective Weed Control: Roundup Weed & Grass Killer4 with Comfort Wand kills tough weeds and grasses to the root, including dandelion, crabgrass, poison ivy, clover, and spotted spurge. Quick Results: Rainproof in as fast as 30 minutes and produces visible results in hours. Planting Flexibility: Allows for planting 1 to 30 days after application (see booklet for details). Versatile Use: Ideal for use in flower beds, around trees and shrubs, on patios, walkways, driveways, gravel, mulch beds, along fences, and foundations. Comfort Wand: Easy-to-use Comfort Wand with one-touch continuous spray provides convenience and reduces hand fatigue. Coverage Area: One 1 gal. container covers up to 300 sq. ft.',
      img: 'https://i5.walmartimages.com/seo/Roundup-Weed-and-Grass-Killer4-with-Comfort-Wand-For-Flower-Beds-and-Trees-1-gal_0e92a490-074c-4382-b7ff-b58eaedc2ea2.da2b6a1fd75183d525ecd2875b20dcb0.jpeg?odnHeight=2000&odnWidth=2000&odnBg=0000?w=500'
    },
    {
      id: 2,
      name: 'Garden Tech Daconil Fungicide 3-Way Control, Ready-to-Use Spray, 32 Fluid Ounce, 1 Spray Bottle',
      category: 'Fungicide',
      price: 24.00,
      rating: 4.9,
      inStock: true,
      isOrganic: true,
      description: 'Triple Action: This fungicide offers 3-Way Control, effectively stopping, controlling, and preventing over 65 different plant diseases. Disease Defense: It targets a wide range of common plant ailments, including Tomato Blight, Anthracnose, Fusarium Wilt, Mold, and Powdery Mildew. Broad Application: Suitable for use on various plants, including vegetables, flowers, fruits, and shade trees, both indoors and outdoors. Weatherproof Protection: The formula provides reliable, rain-proof protection, ensuring its effectiveness even after precipitation. Convenient Application: Presented as a ready-to-use spray in a 32 fluid ounce bottle, it offers a convenient grab-and-go solution for garden',
      img: 'https://i5.walmartimages.com/seo/Garden-Tech-Daconil-Fungicide-3-Way-Control-Ready-to-Use-Spray-32-oz-1-Spray-Bottle_0227bc86-35e6-457a-b746-5344772bf0b0.41ce1004298feef15a1ae76c2d5a1a74.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF?w=500'
    },
    {
      id: 3,
      name: 'Monterey Liqui-Cop Outdoor Copper Fungicide Concentrate Liquid,',
      category: 'Fungicide',
      price: 45.00,
      rating: 4.6,
      inStock: true,
      description: 'Disease Prevention: Liquid copper fungicide spray for disease prevention on fruit trees, nut crops, citrus, vegetables, and ornamentalsEconomical Solution: Economical replacement for Bordeaux mixture with an expanded label Weatherproof Formula: Extremely weatherproof and does not require oil or a sticker Dormant Spray: Effective as a dormant spray on fruit trees Versatile Use: Can be used with horticultural oils such as Monterey Horticultural Oil Wide Application: Controls many diseases attacking citrus, fruits, nuts, vegetables, and ornamentals Preventative Control: Copper pesticides are considered preventative, not curative, of plant diseases Complete Coverage: Plant surfaces must be completely covered with the fungicide to successfully prevent infection',
      img: 'https://i5.walmartimages.com/seo/Monterey-Liqui-Cop-Outdoor-Copper-Fungicide-Concentrate-Liquid-8-oz_8388208e-50de-4cc8-bda6-c6652ff7eb6f.86670ce378c2befe9970bc1cc2925245.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF?w=500'
    },
    {
      id: 4,
      name: 'Turf Builder Triple Action1, 12,000 sq. ft., Lawn Fertilizer with Weed Control and Preventer',
      category: 'Fertilizers',
      price: 35.99,
      rating: 4.7,
      inStock: true,
      description: 'Three-in-One Formula: Scotts Turf Builder Triple Action1 kills weeds, prevents crabgrass, and feeds grass to build thick, green lawns. Weed Control: Effectively controls existing lawn weeds such as dandelion, clover, dollar weed, ground ivy, chickweed, plantain, henbit, and english daisy. Crabgrass Prevention: Prevents crabgrass for up to 4 months and stops other listed grassy weeds from invading your lawn. Grass Compatibility: Suitable for use on Bahiagrass, Centipedegrass, Kentucky Bluegrass, Perennial Ryegrass, Bermudagrass, Tall Fescue, Fine Fescue, and Zoysiagrass. Application Instructions: Apply to a wet lawn with a Scotts spreader, water in after 24 hours, and use in early spring when dandelions are actively growing. Coverage Area: A 33.94 lb. bag treats up to 12,000 sq. ft., providing extensive coverage for large lawns.',
      img: 'https://i5.walmartimages.com/seo/Turf-Builder-Triple-Action1-12-000-sq-ft-Lawn-Fertilizer-with-Weed-Control-and-Preventer_a4b3bfef-d51e-4354-a6cd-9d049c358c31.4827a2e309ff071019bcf7149fd4377c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF?w=500'
    },
    {
      id: 5,
      name: 'Ortho Home Defense Max Indoor Insect Barrier with Extended Reach Comfort Wand, 1 gal.',
      category: 'Pesticides',
      price: 12.00,
      rating: 4.2,
      inStock: false,
      description: `Effective Insect Control: Start killing ants, roaches, spiders, fleas, and ticks with Ortho Home Defense Max Indoor Insect Barrier. Year-Long Protection: Provides 365 days of protection against ants, roaches, and spiders on nonporous surfaces indoors. Versatile Application: Suitable for use in kitchens, bathrooms, basements, and around doors and windows; can also be applied outdoors to foundations. Preventative Treatment: Create an insect barrier anytime as a preventative measure or after noticing insect activity. Extended Reach Wand: Features an ergonomically-designed Comfort Wand with 2x extended reach, multiple spray settings, and a one-touch continuous stream delivery. Fast-Drying Formula: The formula dries quickly, has no fumes, and leaves no stains, making it safe for indoor use. Comprehensive Coverage: Kills 180+ listed insects, including ants,`,
      img: 'https://i5.walmartimages.com/seo/Ortho-Home-Defense-Max-Indoor-Insect-Barrier-with-Extended-Reach-Comfort-Wand-1-gal_e137997b-1ed8-4694-8e63-4aa56199d68e.1ce25b2921fe61809c89a49fb62d0c78.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF?w=500'
    }
  ]);

  categories = ['All', 'Fungicide', 'Fertilizers', 'Pesticides', 'Tools'];

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();

    return this.products().filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                           product.description.toLowerCase().includes(query);
      const matchesCategory = cat === 'All' || product.category === cat;
      
      return matchesSearch && matchesCategory;
    });
  });

  addToCart(product: Product) {
    if (product.inStock) {
      console.log(` Added to cart: ${product.name}`);
      alert(`${product.name} added to cart!`);
    }
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  filterByCategory(cat: string) {
    this.selectedCategory.set(cat);
  }






  // أضف هذه المتغيرات داخل الكلاس
selectedProduct = signal<any>(null);
isDetailsOpen = signal(false);

openDetails(product: any) {
  this.selectedProduct.set(product);
  this.isDetailsOpen.set(true);
  // منع السكرول في الخلفية عند فتح التفاصيل
  document.body.style.overflow = 'hidden';
}

closeDetails() {
  this.isDetailsOpen.set(false);
  this.selectedProduct.set(null);
  document.body.style.overflow = 'auto';
}
}
