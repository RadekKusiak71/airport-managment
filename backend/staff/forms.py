from django import forms
from .models import Flight


class FlightForm(forms.ModelForm):
    class Meta:
        model = Flight
        fields = '__all__'

    departure_date = forms.DateTimeField(
        input_formats=['%Y-%m-%d %H:%M'],
        widget=forms.TextInput(attrs={'type': 'datetime-local'})
    )

    arrival_date = forms.DateTimeField(
        input_formats=['%Y-%m-%d %H:%M'],
        widget=forms.TextInput(attrs={'type': 'datetime-local'})
    )

    def clean(self):
        cleaned_data = super().clean()
        departure_date = cleaned_data.get('departure_date')
        arrival_date = cleaned_data.get('arrival_date')

        if departure_date and arrival_date and departure_date >= arrival_date:
            raise forms.ValidationError("The arrival date must be later than the departure date.")

        return cleaned_data

