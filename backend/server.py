from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Order Model
class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    email: Optional[str] = None
    product_name: str
    quantity: int = 1
    notes: Optional[str] = None
    pickup_date: Optional[str] = None

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    phone: str
    email: Optional[str] = None
    product_name: str
    quantity: int = 1
    notes: Optional[str] = None
    pickup_date: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Contact Model
class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Testimonial Model
class TestimonialCreate(BaseModel):
    name: str
    message: str
    rating: int = 5

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    message: str
    rating: int = 5
    avatar: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Product Model
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: int
    category: str
    image_url: str
    is_featured: bool = False

# Routes
@api_router.get("/")
async def root():
    return {"message": "Roti Manis Bakery API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(input: OrderCreate):
    order_dict = input.model_dump()
    order_obj = Order(**order_dict)
    doc = order_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    _ = await db.orders.insert_one(doc)
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_orders():
    orders = await db.orders.find({}, {"_id": 0}).to_list(1000)
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    return orders

# Contact Routes
@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact_dict = input.model_dump()
    contact_obj = Contact(**contact_dict)
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    _ = await db.contacts.insert_one(doc)
    return contact_obj

# Testimonial Routes
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial_dict = input.model_dump()
    testimonial_obj = Testimonial(**testimonial_dict)
    doc = testimonial_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    _ = await db.testimonials.insert_one(doc)
    return testimonial_obj

# Product Routes
@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).to_list(100)
    return products

@api_router.post("/products", response_model=Product)
async def create_product(product: Product):
    doc = product.model_dump()
    _ = await db.products.insert_one(doc)
    return product

# Seed initial data
@api_router.post("/seed")
async def seed_data():
    # Check if already seeded
    existing_products = await db.products.count_documents({})
    if existing_products > 0:
        return {"message": "Data already seeded"}
    
    # Seed Products
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Croissant Premium",
            "description": "Croissant butter klasik dengan lapisan renyah sempurna",
            "price": 35000,
            "category": "Pastry",
            "image_url": "https://images.pexels.com/photos/8105060/pexels-photo-8105060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "is_featured": True
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sourdough Artisan",
            "description": "Roti sourdough dengan fermentasi alami 24 jam",
            "price": 85000,
            "category": "Roti",
            "image_url": "https://images.unsplash.com/photo-1769424052131-9044fece031e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHw0fHxhcnRpc2FuJTIwc291cmRvdWdoJTIwYnJlYWQlMjBydXN0aWMlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzE3MDA3OTJ8MA&ixlib=rb-4.1.0&q=85",
            "is_featured": True
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Wedding Cake Elegant",
            "description": "Kue pengantin mewah dengan dekorasi bunga segar",
            "price": 2500000,
            "category": "Kue",
            "image_url": "https://images.unsplash.com/photo-1589648219334-23195fe1043d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxwYXN0cnklMjBjaGVmJTIwZGVjb3JhdGluZyUyMGNha2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzcxNzAwNzk2fDA&ixlib=rb-4.1.0&q=85",
            "is_featured": True
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Pain au Chocolat",
            "description": "Pastry lembut dengan cokelat Belgium premium",
            "price": 42000,
            "category": "Pastry",
            "image_url": "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "is_featured": False
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Baguette Klasik",
            "description": "Baguette Prancis dengan kulit renyah dan lembut di dalam",
            "price": 45000,
            "category": "Roti",
            "image_url": "https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "is_featured": False
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Birthday Cake Deluxe",
            "description": "Kue ulang tahun dengan buttercream dan fondant premium",
            "price": 650000,
            "category": "Kue",
            "image_url": "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "is_featured": True
        }
    ]
    
    for product in products:
        await db.products.insert_one(product)
    
    # Seed Testimonials
    testimonials = [
        {
            "id": str(uuid.uuid4()),
            "name": "Sarah Wijaya",
            "message": "Roti terenak yang pernah saya coba! Croissant-nya sangat renyah dan butter-nya terasa premium. Pasti akan kembali lagi!",
            "rating": 5,
            "avatar": "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Budi Santoso",
            "message": "Wedding cake dari Roti Manis membuat acara pernikahan kami sempurna. Desainnya elegan dan rasanya luar biasa!",
            "rating": 5,
            "avatar": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Maya Putri",
            "message": "Sourdough artisan mereka adalah yang terbaik di kota! Fermentasi sempurna dan teksturnya sangat nikmat.",
            "rating": 5,
            "avatar": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    for testimonial in testimonials:
        await db.testimonials.insert_one(testimonial)
    
    return {"message": "Data seeded successfully", "products": len(products), "testimonials": len(testimonials)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
