# Graphics and Assets Guide for Impact Sandbox

This guide will help you add custom graphics, sprites, and visual elements to enhance your Impact Sandbox game.

## 📁 File Structure for Graphics

Create the following directory structure in your project:

```
/workspace/
├── public/
│   ├── images/
│   │   ├── sprites/
│   │   │   ├── nature/
│   │   │   │   ├── trees/
│   │   │   │   ├── flowers/
│   │   │   │   ├── animals/
│   │   │   │   └── elements/
│   │   │   ├── characters/
│   │   │   └── ui/
│   │   ├── backgrounds/
│   │   └── icons/
│   └── assets/
│       ├── sounds/
│       └── animations/
```

## 🎨 Recommended Graphics Specifications

### Sprites and Icons
- **Format**: PNG with transparency
- **Size**: 32x32px to 128x128px (scalable)
- **Style**: Pixel art or clean vector-style graphics
- **Background**: Transparent

### Background Images
- **Format**: JPG or PNG
- **Size**: 1920x1080px minimum
- **Style**: Nature-themed, environmental
- **Quality**: High resolution for crisp display

### Animated Sprites
- **Format**: PNG sequence or GIF
- **Frame Rate**: 8-12 FPS for smooth animation
- **Size**: 64x64px to 128x128px
- **Loop**: Seamless looping animations

## 🌿 Nature-Themed Graphics Suggestions

### Trees and Plants
- Oak, pine, maple trees
- Wildflowers, ferns, grass
- Seasonal variations (spring, summer, fall, winter)
- Different growth stages

### Animals and Wildlife
- Birds (eagles, owls, songbirds)
- Butterflies and insects
- Small mammals (squirrels, rabbits)
- Fish and aquatic life

### Environmental Elements
- Clouds, rain, snow
- Sun, moon, stars
- Water droplets, leaves falling
- Environmental particles

## 🎮 Character Sprites

### Stakeholder Avatars
- Environmental scientist
- Community leader
- Business representative
- Government official
- Local resident

### Animated Characters
- Walking animations
- Talking/idle animations
- Emotional expressions
- Professional attire variations

## 📱 UI Graphics

### Icons
- Decision buttons
- Progress indicators
- Status symbols
- Navigation elements

### Backgrounds
- Scenario-specific environments
- Office settings
- Natural landscapes
- Abstract environmental themes

## 🔧 How to Add Graphics

### 1. Upload Files
Place your graphics in the appropriate `/public/images/` directories.

### 2. Update Components
Modify the `NatureSprite` component to include your custom graphics:

```jsx
// In NatureSprite.jsx
const getSpriteContent = () => {
  switch (type) {
    case "custom-tree":
      return <img src="/images/sprites/nature/trees/oak.png" alt="Oak Tree" />;
    case "custom-bird":
      return <img src="/images/sprites/nature/animals/robin.png" alt="Robin" />;
    // Add more custom types...
  }
};
```

### 3. Add Background Images
Update CSS or component styles:

```css
.custom-bg {
  background-image: url('/images/backgrounds/forest-scene.jpg');
  background-size: cover;
  background-position: center;
}
```

### 4. Animated Sprites
For animated sprites, use CSS animations or the Framer Motion library:

```jsx
<motion.img
  src="/images/sprites/nature/animals/butterfly-flying.gif"
  animate={{ 
    x: [0, 100, 0],
    y: [0, -20, 0]
  }}
  transition={{ 
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
/>
```

## 🎨 Color Palette Integration

Ensure your graphics match the game's color scheme:

### Primary Colors
- Forest Green: `#22c55e` to `#16a34a`
- Water Blue: `#3b82f6` to `#1d4ed8`
- Earth Purple: `#a855f7` to `#7c3aed`

### Background Colors
- Dark Forest: `#0f2f0f` to `#1a3a1a`
- Card Background: `rgba(15, 23, 42, 0.9)`

## 🚀 Performance Tips

1. **Optimize Images**: Compress PNGs and JPGs for web
2. **Use Spritesheets**: Combine multiple small images into one file
3. **Lazy Loading**: Load images only when needed
4. **Responsive Images**: Provide different sizes for different screen sizes

## 📝 Example Implementation

Here's how to add a custom tree sprite:

1. Save your tree image as `/public/images/sprites/nature/trees/custom-tree.png`
2. Update the `NatureSprite` component:

```jsx
case "custom-tree":
  return (
    <img 
      src="/images/sprites/nature/trees/custom-tree.png" 
      alt="Custom Tree"
      className="w-full h-full object-contain"
    />
  );
```

3. Use it in your components:

```jsx
<NatureSprite type="custom-tree" size="large" position="floating" />
```

## 🎯 Asset Recommendations

### Free Resources
- **OpenGameArt.org**: Free game assets
- **Freepik**: Nature illustrations and icons
- **Unsplash**: High-quality nature photos
- **Pixabay**: Free images and graphics

### Paid Resources
- **Adobe Stock**: Professional graphics
- **Shutterstock**: High-quality images
- **Game Asset Stores**: Specialized game graphics

## 🔄 Updating Existing Graphics

To replace existing graphics:

1. Keep the same filename and location
2. Ensure the new image has the same dimensions
3. Test across different screen sizes
4. Update any color references in CSS

## 📱 Mobile Considerations

- Ensure graphics are readable on small screens
- Use vector graphics when possible for scalability
- Test touch interactions with graphic elements
- Consider reduced motion preferences

## 🎨 Customization Ideas

### Seasonal Themes
- Spring: Fresh greens, blooming flowers
- Summer: Vibrant colors, full foliage
- Fall: Warm oranges, falling leaves
- Winter: Cool blues, bare branches

### Environmental Themes
- Urban: City buildings, pollution effects
- Rural: Farm landscapes, agricultural elements
- Coastal: Ocean waves, marine life
- Mountain: Peaks, alpine vegetation

This guide should help you create a visually rich and engaging Impact Sandbox experience!