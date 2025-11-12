<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/tasks', function () {
    return Inertia::render('Tasks/Index');
});
Route::get('/tasks/create', function () {
    return Inertia::render('Tasks/Create');
});
Route::get('/tasks/{id}/edit', function ($id) {
    return Inertia::render('Tasks/Edit', ['id' => $id]);
});
