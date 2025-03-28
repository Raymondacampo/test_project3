from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.utils import timezone

# User Model
class User(AbstractUser):
    born_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

     # ✅ Fix reverse accessor clashes by setting `related_name="+"`
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="+",  # Prevents conflicts
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="+",  # Prevents conflicts
        blank=True
    )

    def save(self, *args, **kwargs):
        """Auto-generate a unique username if not provided"""
        if not self.username:
            self.username = f"user_{uuid.uuid4().hex[:8]}"  # ✅ Generate unique username
        super().save(*args, **kwargs)


    def __str__(self):
        return self.email

# Doctor Model (Extends User)
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    exequatur = models.CharField(max_length=20, unique=True)  # Unique doctor registration number
    specialties = models.ManyToManyField("Specialty", related_name="doctors")  # Many doctors can have many specialties
    clinics = models.ManyToManyField("Clinic", related_name="doctors")  # Many doctors work in many clinics
    experience = models.PositiveIntegerField(help_text="Years of Experience")

    def __str__(self):
        return f"Dr. {self.user.first_name} {self.user.last_name} - {self.exequatur}"

# DoctorDocument Upload Path Function
def doctor_document_upload_path(instance, filename):
    return f"doctor_documents/doctor_{instance.doctor.id}/{timezone.now().strftime('%Y%m%d_%H%M%S')}_{filename}"

class DoctorDocument(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="documents")
    file = models.FileField(upload_to="doctor_documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.description or 'Document'} for {self.doctor}"

# Specialty Model
class Specialty(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Clinic Model
class Clinic(models.Model):
    name = models.CharField(max_length=150)
    address = models.TextField()
    google_place_id = models.CharField(max_length=255, blank=True, null=True)  # ✅ Optional Google Maps ID

    def __str__(self):
        return self.name

class PasswordResetToken(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    used = models.BooleanField(default=False)

    def is_valid(self):
        return not self.used and timezone.now() < self.expires_at

    def __str__(self):
        return f"Token for {self.email} - Used: {self.used}"