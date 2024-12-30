from flask import Flask, request, jsonify # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@localhost/sporting_club'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Members(db.Model):
    __tablename__ = 'members'
    memberID = db.Column(db.Integer, primary_key=True)
    member_name = db.Column(db.String(50), nullable=False)
    member_email = db.Column(db.String(50), nullable=False)
    member_phone = db.Column(db.Integer, nullable=False)
    subscriptionStatus = db.Column(db.String(50), nullable=False)

class Subscription(db.Model):
    __tablename__ = 'subscription'
    subscription_ID = db.Column(db.Integer, primary_key=True)
    plan_type = db.Column(db.String(50), nullable=False)
    startDate = db.Column(db.Integer, nullable=False)
    endDate = db.Column(db.Integer, nullable=False)
    Amount = db.Column(db.Integer, nullable=False)
    memberID = db.Column(db.Integer, db.ForeignKey('members.memberID'))

class Team(db.Model):
    __tablename__ = 'team'
    Team_Name = db.Column(db.String(50), primary_key=True)
    num_player = db.Column(db.Integer, nullable=False)
    Team_captin = db.Column(db.String(30))
    Coach_ID = db.Column(db.Integer, db.ForeignKey('coach.Coach_ID'))

class TeamMembers(db.Model):
    __tablename__ = 'team_members'
    Team_Member_ID = db.Column(db.Integer, primary_key=True)
    Team_Name = db.Column(db.String(50), db.ForeignKey('team.Team_Name'), nullable=False)
    memberID = db.Column(db.Integer, db.ForeignKey('members.memberID'), nullable=False)
    Position = db.Column(db.String(30))
    Country = db.Column(db.String(30))
    Team_Member_name = db.Column(db.String(30))

class Finance(db.Model):
    __tablename__ = 'finance'
    Finance_ID = db.Column(db.Integer, primary_key=True)
    Finance_type = db.Column(db.String(50), nullable=False)
    Amount = db.Column(db.Integer, nullable=False)
    Date_Expenses = db.Column(db.Integer, nullable=False)
    Team_Name = db.Column(db.String(50), db.ForeignKey('team.Team_Name'), nullable=False)

class Attendance(db.Model):
    __tablename__ = 'attendance'
    Attendance_ID = db.Column(db.Integer, primary_key=True)
    memberID = db.Column(db.Integer, db.ForeignKey('members.memberID'), nullable=False)
    Date_Attendance = db.Column(db.Integer, nullable=False)
    Status = db.Column(db.String(50), nullable=False)

class Activities(db.Model):
    __tablename__ = 'activities'
    Activity_ID = db.Column(db.Integer, primary_key=True)
    Name_Activity = db.Column(db.String(50), nullable=False)
    Description_Activity = db.Column(db.String(50))
    Date_Activity = db.Column(db.Integer, nullable=False)
    Finance_ID = db.Column(db.Integer, db.ForeignKey('finance.Finance_ID'), nullable=False)

class Payments(db.Model):
    __tablename__ = 'payments'
    Payments_ID = db.Column(db.Integer, primary_key=True)
    memberID = db.Column(db.Integer, db.ForeignKey('members.memberID'), nullable=False)
    amount_Payments = db.Column(db.Integer, nullable=False)
    Date_Payments = db.Column(db.Integer, nullable=False)
    Payment_Method = db.Column(db.String(50), nullable=False)

class Coach(db.Model):
    __tablename__ = 'coach'
    Coach_ID = db.Column(db.Integer, primary_key=True)
    Name_Coache = db.Column(db.String(50), nullable=False)
    Phone_Number = db.Column(db.Integer, nullable=False)
    Email_Coache = db.Column(db.String(30), nullable=False)
    Team_Name = db.Column(db.String(50), db.ForeignKey('team.Team_Name'), nullable=False)

class Facilities(db.Model):
    __tablename__ = 'facilities'
    Facilitiy_ID = db.Column(db.Integer, primary_key=True)
    Name_Facilities = db.Column(db.String(50), nullable=False)
    Availability_Facilities = db.Column(db.String(50), nullable=False)
    Cost_Per_Hour = db.Column(db.Integer, nullable=False)
    memberID = db.Column(db.Integer, db.ForeignKey('members.memberID'), nullable=False)

class Manager(db.Model):
    __tablename__ = 'manger'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.Integer, nullable=False)

class Sponsored(db.Model):
    __tablename__ = 'sponsored'
    name = db.Column(db.String(30), primary_key=True)
    time_limit = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer, nullable=False)

class Service(db.Model):
    __tablename__ = 'service'
    type_service = db.Column(db.String(30), nullable=False)
    id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    description = db.Column(db.String(50), nullable=False)
    Finance_ID = db.Column(db.Integer, db.ForeignKey('finance.Finance_ID'))

class Employee(db.Model):
    __tablename__ = 'employee'
    name = db.Column(db.String(20), nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Integer, nullable=False)

class TeamMedical(db.Model):
    __tablename__ = 'team_medical'
    Name_DR = db.Column(db.String(20), nullable=False)
    ID_DR = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(20), nullable=False)
    Specialization = db.Column(db.String(20), nullable=False)
    Team_Name = db.Column(db.String(50), db.ForeignKey('team.Team_Name'), nullable=False)

# Routes
@app.route('/members', methods=['GET', 'POST'])
def handle_members():
    if request.method == 'GET':
        members = Members.query.all()
        return jsonify([{
            'memberID': m.memberID,
            'member_name': m.member_name,
            'member_email': m.member_email,
            'member_phone': m.member_phone,
            'subscriptionStatus': m.subscriptionStatus
        } for m in members])

    elif request.method == 'POST':
        data = request.get_json()
        new_member = Members(**data)
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'message': 'Member added successfully!'}), 201

# Run server
if __name__ == '__main__':
    app.run(debug=True)
