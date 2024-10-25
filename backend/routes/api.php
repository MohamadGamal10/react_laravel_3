<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register' , [AuthController::class , 'register']);
Route::post('/login' , [AuthController::class , 'login']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function (){
    Route::post('/refresh' , [AuthController::class , 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // users
    Route::prefix('user')->controller(AuthController::class)->group(function() {
        Route::get('show' , 'getAll');
        Route::get('showbyid/{id}' , 'getbyId');
        Route::post('update/{id}' , 'updateUser');
        Route::post('create' , 'register');
        Route::delete('delete/{user_id}' , 'remove');
    });

    Route::prefix('product')->controller(ProductController::class)->group(function () {
        Route::get('show', 'index');
        Route::get('showbyid/{id}', 'getbyId');
        Route::post('update/{id}', 'update');
        Route::post('create', 'create');
        Route::delete('delete/{id}', 'remove');
    });
});