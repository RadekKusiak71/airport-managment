from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView, ListView, DeleteView, UpdateView

from .forms import FlightForm
from .models import Flight


class HomeView(TemplateView):
    template_name = 'staff/home.html'


class CustomLoginView(LoginView):
    template_name = 'staff/login.html'

    def form_valid(self, form):
        user = form.get_user()
        if user.is_staff:
            response = super().form_valid(form)
            messages.success(self.request, f"Welcome back {self.request.user.username}!")
            return response
        else:
            messages.error(self.request, "You do not have staff status to log in")
            return self.form_invalid(form)


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('staff:home')


class FlightsView(LoginRequiredMixin, ListView):
    model = Flight
    template_name = 'staff/flights.html'
    context_object_name = 'flights'


class AddFlightView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    form_class = FlightForm
    template_name = 'staff/add_flight.html'
    success_url = reverse_lazy('staff:flights')
    success_message = "Flight has been added successfully."


class UpdateFlightView(LoginRequiredMixin, SuccessMessageMixin,  UpdateView):
    model = Flight
    form_class = FlightForm
    template_name = 'staff/update_flight.html'
    success_url = reverse_lazy('staff:flights')
    success_message = "The flight data was updated successfully."

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = self.form_class(instance=self.get_object())
        return context


class DeleteFlightView(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = Flight
    success_url = reverse_lazy('staff:flights')
    success_message = "The flight was deleted successfully."
