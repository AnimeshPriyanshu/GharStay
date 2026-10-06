# GharStay

**Find a trusted place to stay, even when you don't know the city.**

GharStay is a short-term accommodation platform for Tier-2 and Tier-3 Indian cities, connecting guests with verified local homes and spare rooms.

## Problem

Travelers to smaller Indian cities often struggle to find:
- Reliable, verified accommodation
- Last-minute stays for emergencies (hospital visits, unexpected travel)
- Local assistance when they don't know the area
- Affordable alternatives to hotels

## Solution

GharStay provides a platform where:
- **Guests** can find and book verified local homes/spare rooms
- **Hosts** can list unused rooms/spaces and earn income
- **Local partners** (auto drivers, shopkeepers, vendors) help guests find nearby accommodation, especially during urgent situations
- **Planned stays**: tourism, weddings, pilgrimages, business, exams, family visits
- **Urgent stays**: hospital visits, emergencies, unexpected travel, last-minute accommodation

## Core Features

- **Verified Stays**: All properties verified by GharStay
- **Hyperlocal Network**: Auto drivers, shopkeepers, and local partners assist with urgent accommodation needs
- **Multi-purpose Booking**: Tourism, hospital visits, emergencies, exams, weddings, pilgrimages, business
- **Host Dashboard**: Manage properties, bookings, earnings
- **Guest Dashboard**: Bookings, saved properties, emergency requests
- **Local Partner Dashboard**: Emergency requests nearby, available properties
- **Search & Discovery**: City, dates, guests, purpose, price range, property type
- **Property Details**: Images, amenities, host info, reviews, verification status

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Lucide React (icons)

### Backend
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL
- Zod (validation)
- CORS, dotenv

### Development
- mise (runtime management)
- ESLint + Prettier
- npm workspaces (monorepo)

## Project Structure

```
gharstay/
├── apps/
│   ├── web/                 # React frontend
│   └── api/                 # Express backend
├── packages/
│   └── shared/              # Shared types & constants
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Development seed data
├── .mise.toml               # Runtime versions
├── .gitignore
├── .env.example
├── package.json             # Root workspace config
└── README.md
```

## Prerequisites

- [mise](https://mise.jdx.dev/) installed
- PostgreSQL 15+ running locally or accessible
- Git

## mise Setup

```bash
# Install mise if not already installed
curl https://mise.jdx.dev/install.sh | sh

# Add to shell config (bash/zsh/fish)
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd gharstay

# Install Node.js version specified in .mise.toml
mise install

# Install all dependencies
mise exec -- npm install
```

## Environment Setup

```bash
# Copy environment example
cp .env.example .env

# Edit .env with your configuration
# At minimum, set DATABASE_URL to your PostgreSQL connection string
```

## Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed development data
npm run db:seed

# Optional: Open Prisma Studio
npm run db:studio
```

## Running the Project

### Development (both frontend and backend)

```bash
npm run dev
```

This starts:
- Backend API at http://localhost:3001
- Frontend at http://localhost:5173

### Run individually

```bash
# Backend only
npm run dev:api

# Frontend only
npm run dev:web
```

### Production Build

```bash
npm run build
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development |
| `npm run dev:api` | Start backend only |
| `npm run dev:web` | Start frontend only |
| `npm run build` | Build all workspaces for production |
| `npm run lint` | Run ESLint on all workspaces |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Prisma Studio |

## API Endpoints

### Health
- `GET /api/health` - Health check

### Properties
- `GET /api/properties` - List properties with filters
- `POST /api/properties` - Create property (host)
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property (host)

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking status

### Reviews
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review

### Emergency Requests
- `GET /api/emergency-requests` - List emergency requests
- `POST /api/emergency-requests` - Create emergency request

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## Future Roadmap

- [ ] JWT authentication with refresh tokens
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Document verification for hosts
- [ ] Real-time chat between guests and hosts
- [ ] Map integration (Mapbox/OpenStreetMap)
- [ ] Push notifications
- [ ] Multi-language support (Hindi, regional languages)
- [ ] Mobile app (React Native)
- [ ] Admin dashboard with analytics
- [ ] Review moderation
- [ ] Cancellation policies
- [ ] Loyalty program
- [ ] Redis caching for search
- [ ] Email/SMS notifications
- [ ] Image upload to cloud storage (S3/Cloudinary)

## License

MIT License - feel free to use for learning or building upon.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run lint and format
5. Submit a pull request

---

Built with ❤️ for travelers to India's Tier-2 and Tier-3 cities.