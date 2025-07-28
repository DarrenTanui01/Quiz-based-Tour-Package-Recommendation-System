from models import db, TourPackage, Hotel, TransportOption
from app import create_app

app = create_app()

with app.app_context():
    # Example: Get all packages
    packages = TourPackage.query.all()
    # Clear existing hotels and transport options (optional)
    Hotel.query.delete()
    TransportOption.query.delete()
    db.session.commit()

    # Add hotels for each package
    for pkg in packages:
        if pkg.name == "The Mara & Laikipia Ultimate Safari":
            hotel1 = Hotel(
                name="Angama Mara",
                location="Maasai Mara",
                description="Luxury lodge with panoramic views.",
                package_id=pkg.id,
                price_per_night=650,
                image_url="https://example.com/angama.jpg"
            )
            hotel2 = Hotel(
                name="Loisaba Tented Camp",
                location="Laikipia",
                description="Luxury tented camp in Laikipia.",
                package_id=pkg.id,
                price_per_night=600,
                image_url="https://example.com/loisaba.jpg"
            )
            db.session.add_all([hotel1, hotel2])

            # Transport options
            t1 = TransportOption(
                type="flight",
                name="Wilson to Mara Air",
                details="Direct flight from Nairobi Wilson to Mara North.",
                price=300,
                package_id=pkg.id
            )
            t2 = TransportOption(
                type="van",
                name="Private 4x4 Land Cruiser",
                details="All game drives in private 4x4.",
                price=200,
                package_id=pkg.id
            )
            db.session.add_all([t1, t2])

        elif pkg.name == "Diani & Wasini Island Adventure":
            hotel1 = Hotel(
                name="Diani Beachalets",
                location="Diani Beach",
                description="Budget-friendly guesthouse on the beach.",
                package_id=pkg.id,
                price_per_night=50,
                image_url="https://example.com/diani.jpg"
            )
            db.session.add(hotel1)

            t1 = TransportOption(
                type="train",
                name="SGR Nairobi-Mombasa",
                details="Economy class train ticket.",
                price=20,
                package_id=pkg.id
            )
            t2 = TransportOption(
                type="van",
                name="Local Matatu",
                details="Matatu/tuk-tuk transfers in Diani.",
                price=10,
                package_id=pkg.id
            )
            db.session.add_all([t1, t2])

        elif pkg.name == "Rift Valley Adrenaline Rush":
            hotel1 = Hotel(
                name="Sawela Lodges Naivasha",
                location="Naivasha",
                description="Boutique hotel near Lake Naivasha.",
                package_id=pkg.id,
                price_per_night=120,
                image_url="https://example.com/sawela.jpg"
            )
            db.session.add(hotel1)
            t1 = TransportOption(
                type="van",
                name="Private Safari Van",
                details="Safari van from Nairobi for the trip.",
                price=150,
                package_id=pkg.id
            )
            db.session.add(t1)
        elif pkg.name == "Nairobi & Maasai Village Immersion":
            hotel1 = Hotel(
                name="The King Post",
                location="Nairobi",
                description="Boutique hotel in Nairobi.",
                package_id=pkg.id,
                price_per_night=90,
                image_url="https://example.com/kingpost.jpg"
            )
            hotel2 = Hotel(
                name="Maasai Eco-camp",
                location="Maasai Village",
                description="Community-run Maasai homestay.",
                package_id=pkg.id,
                price_per_night=60,
                image_url="https://example.com/maasai.jpg"
            )
            db.session.add_all([hotel1, hotel2])
            t1 = TransportOption(
                type="van",
                name="Private Van",
                details="Private van for city and village transfers.",
                price=100,
                package_id=pkg.id
            )
            db.session.add(t1)
        # Add more elif blocks for other packages as needed

    db.session.commit()
    print("Hotels and transport options populated.")