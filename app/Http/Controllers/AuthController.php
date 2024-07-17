<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return inertia('Auth/Login/Index');
    }
    public function loginPost(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        throw ValidationException::withMessages([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function register(Request $request)
    {


        return inertia('Auth/Register/Index');
    }

    public function registerPost(Request $request)
    {
        $attr = $request->validate([
            "firstname" => "required|string|min:3",
            "lastname" => "nullable|string|min:3",
            "phone" => "required|numeric|digits:12",
            "address" => "required|string|min:10",
            "tanggal_lahir" => "required|date|before:now",
            "tempat_lahir" => "required|string|min:4|max:25",
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            "email" => "required|email",
            "password" => "required|confirmed|alpha_dash|min:8",
        ]);
        $attr['role'] = 'pelanggan';
        $attr['image'] = $request->file('image') ? $request->file('image')->store('Form/user') : null;
        $user = User::create($attr);
        $user->assignRole('pelanggan');
        Auth::login($user);
        return redirect()->route('home');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
