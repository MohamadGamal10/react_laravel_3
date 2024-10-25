<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return $products;
    }

    public function create(Request $request)
    {
        $product = new Product();
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image',
        ]);
        $product->title = $request->title;
        $product->description = $request->description;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $path = 'images';
            $file->move($path, $filename);
            $product->image = url('/') . '/images/' . $filename;
        }

        $product->save();
    }

    public function getbyId($id)
    {
        $obj = Product::where('id', $id)->get();
        return $obj;
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);
        $product->title = $request->title;
        $product->description = $request->description;

        if ($request->hasFile('image')) {
            $oldpath = public_path() . '/images/' . substr($product['image'], strrpos($product['image'], '/') + 1);

            if (File::exists($oldpath)) {
                File::delete($oldpath);
            }
            $file = $request->file('image');
            $filename = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $product->image = url('/') . '/images/' . $filename;

            $path = 'images';
            $file->move($path, $filename);
        }

        $product->save();
    }


    public function remove($id)
    {
        DB::table('products')->where('id', '=', $id)->delete();
    }
}