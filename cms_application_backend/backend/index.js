const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const Page = require('./models/Page');
// const accordionRoutes = require('./routes/accordion');
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const Product = require('./models/Product'); 
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');  
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});
// app.use('/accordion', accordionRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await Product.findOneAndUpdate({ id: productId }, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: productId });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});



app.get('/pages', async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pages', error: error.message });
  }
});




const angularProjectPath = path.resolve(__dirname, '..', '..', 'techdenalicms_20_02_2024');
console.log('Calculated Angular project path:', angularProjectPath);
if (!fs.existsSync(angularProjectPath)) {
  console.error('Calculated Angular project path does not exist:', angularProjectPath);
  process.exit(1);
}
const componentSourcePath = path.join(angularProjectPath, 'src', 'app', 'layout1'); // Ensure this path is correct
const componentBasePath = path.join(angularProjectPath, 'src', 'app');
console.log('Component source path:', componentSourcePath);
console.log('Component base path:', componentBasePath);

app.post('/generate-component', (req, res) => {
  const { componentName } = req.body;

  if (!componentName) {
    return res.status(400).send('Component name is required');
  }

  const componentTargetPath = path.join(componentBasePath, componentName);

  // Log the target path
  console.log('Component target path:', componentTargetPath);

  // Generate the new component using Angular CLI
  const command = `cd ${angularProjectPath} && ng generate component ${componentName}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error generating component:', stderr);
      return res.status(500).send(`Error: ${stderr}`);
    }

    // Copy files from the original component to the new component
    fs.copy(componentSourcePath, componentTargetPath, (err) => {
      if (err) {
        console.error('Error copying component files:', err);
        return res.status(500).send(`Error copying component files: ${err}`);
      }

      // Rename files in the new component directory to match the new component name
      const files = fs.readdirSync(componentTargetPath);
      files.forEach(file => {
        const oldFilePath = path.join(componentTargetPath, file);
        const newFilePath = oldFilePath.replace(/layout1/g, componentName);
        fs.renameSync(oldFilePath, newFilePath);

        // Update file contents to replace original component name with new component name
        let content = fs.readFileSync(newFilePath, 'utf8');
        content = content.replace(/Layout1Component/g, `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}Component`);
        content = content.replace(/layout1/g, componentName);
        fs.writeFileSync(newFilePath, content, 'utf8');
      });

      res.send(`Component ${componentName} generated and cloned successfully`);
    });
  });
});









// app.post('/pages', async (req, res) => {
//   try {
//     const { pageName, pageUrl, components,layout } = req.body;
//     const newPage = new Page({ pageName, pageUrl, components ,layout});
//     await newPage.save();
//     res.status(201).json(newPage);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating page', error: error.message });
//   }
// });
app.post('/pages', async (req, res) => {
  try {
    const { pageName, pageUrl, components, pageLayout } = req.body;
    const newPage = new Page({ pageName, pageUrl, components, layout: pageLayout });
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error: error.message });
  }
});

// app.get('components/:pageUrl', async (req, res) => {
//     try {
//       const { pageUrl } = req.params;

//       const page = await Page.findOne({ pageUrl: pageUrl }).populate('components');
//       if (!page) {
//         return res.status(404).json({ message: 'Page not found' });
//       }
//       res.status(200).json(page.components);
//     } catch (error) {
//       console.error('Error retrieving components by page URL:', error.message);
//       res.status(500).json({ message: 'Error retrieving components by page URL', error: error.message });
//     }
//   });



app.get('/:pageUrl', async (req, res) => {
  try {
    const { pageUrl } = req.params;
    const page = await Page.findOne({ pageUrl: pageUrl });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    console.error('Error retrieving page by page URL:', error.message);
    res.status(500).json({ message: 'Error retrieving page by page URL', error: error.message });
  }
});
// app.get('/pages/:id', async (req, res) => {
//   try {
//     const page = await Page.findById(req.params.id);
//     if (!page) {
//       return res.status(404).json({ message: 'Page not found' });
//     }
//     res.status(200).json(page);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving page', error: error.message });
//   }
// });
app.get('/pages/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate('components');
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving page', error: error.message });
  }
});

app.put('/pages/:id', async (req, res) => {
  try {
    const { pageName, pageUrl, components } = req.body;

    // Ensure header is first and footer is last in the components array
    const headerComponent = components.find(comp => comp.type === 'header');
    const footerComponent = components.find(comp => comp.type === 'footer');
    const otherComponents = components.filter(comp => comp.type !== 'header' && comp.type !== 'footer');
    const updatedComponents = [];
    if (headerComponent) updatedComponents.push(headerComponent);
    updatedComponents.push(...otherComponents);
    if (footerComponent) updatedComponents.push(footerComponent);

    const page = await Page.findByIdAndUpdate(
      req.params.id, // ID of the page to update
      { pageName, pageUrl, components: updatedComponents }, // Updated fields
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json(page);
  } catch (error) {
    (res.status500).json({ message: 'Error updating page', error: error.message });
  }
});


app.delete('/pages/:id', async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
