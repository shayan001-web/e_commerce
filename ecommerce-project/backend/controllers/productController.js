import Product from '../models/Product.js';
import Category from '../models/Category.js';
import slugify from 'slugify';

// Get all products
export async function list(req, res, next) {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
      ];
    }

    if (category) {
      const categoryRecord = await Category.findOne({
        $or: [{ name: category }, { slug: category }],
      }).select('_id');

      if (!categoryRecord) {
        return res.json({
          success: true,
          message: 'Products fetched successfully',
          data: {
            products: [],
            pagination: {
              page: Number(page),
              limit: Number(limit),
              total: 0,
              pages: 0,
            },
          },
        });
      }

      query.category = categoryRecord._id;
    }

    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    if (minRating) {
      query.rating = {
        $gte: Number(minRating),
      };
    }

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      popularity: { numReviews: -1 },
      newest: { createdAt: -1 },
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', 'name slug')
        .sort(sortMap[sort] || sortMap.newest)
        .skip(skip)
        .limit(Number(limit)),

      Product.countDocuments(query),
    ]);

    res.json({
      success: true,
      message: 'Products fetched successfully',
      data: {
        products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (e) {
    next(e);
  }
}

// Get single product
export async function getOne(req, res, next) {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product fetched',
      data: { product },
    });
  } catch (e) {
    next(e);
  }
}

// Create product
export async function create(req, res, next) {
  try {
    const body = {
      ...req.body,

      slug: slugify(req.body.name, {
        lower: true,
        strict: true,
      }),
    };

    const product = await Product.create(body);

    res.status(201).json({
      success: true,
      message: 'Product created',
      data: { product },
    });
  } catch (e) {
    next(e);
  }
}

// Update product
export async function update(req, res, next) {
  try {
    const body = {
      ...req.body,
    };

    if (body.name) {
      body.slug = slugify(body.name, {
        lower: true,
        strict: true,
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product updated',
      data: { product },
    });
  } catch (e) {
    next(e);
  }
}

// Delete product
export async function remove(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      message: 'Product deleted',
      data: {},
    });
  } catch (e) {
    next(e);
  }
}
