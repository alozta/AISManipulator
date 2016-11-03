/**
 * Created by Ozan on 17.10.2016.
 */
package com.alozta;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Scanner;

public class AISManipulator {
	private static MongoClient mongo = new MongoClient("localhost", 27017);
	private static MongoDatabase db = mongo.getDatabase("bitirme");
	private static MongoCollection collection = db.getCollection("ais");

	public static void main(String [] args){
		String path = "C:\\Users\\Ozan\\Desktop\\Bitirme\\AIS_data\\20161101.csv";       //input file path

		//addAISInCSVFormatToDB(path);                      //ADD NEW ENTRIES

		//System.out.println(getVesselInfo("616715000","2015-10-10 00:00:00.0","2017-10-10 00:00:00.0"));
		//System.out.println(getAllDistinctMMSIs());

		for(Document d : getAllDistinctMMSIs()){
			for(Map.Entry e : d.entrySet()){        //IT IS ASSUMED THAT e ONLY CONTAINS idField, textField
				System.out.println(e.getKey()+":"+e.getValue());
			}
		}
	}

	/**
	 * @return All distinct MMSI's from db.
	 * */
	public static ArrayList<Document> getAllDistinctMMSIs(){
		Document d = db.runCommand(new Document("$eval", "getAllDistinctMMSIs()"));
		d = (Document) d.get("retval");
		return (ArrayList<Document>) d.get("_batch");
	}

	/**
	 * Get information about vessel's movements in certain amount of time.
	 * Successor for mongodb getVesselInfo function.
	 *
	 * @param mmsi ID for the vessel
	 * @param startDate Starting limit for date in ISODate format
	 * @param endDate Ending limit for date in ISODate format
	 * @return Aggregated mongodb result for getVesselInfo function as ArrayList
	 *
	 * Usage: <getVesselInfo("616715000","2015-10-10 00:00:00.0","2017-10-10 00:00:00.0")>
	 * */
	public static ArrayList<Document> getVesselInfo(String mmsi, String startDate, String endDate){
		Document d = db.runCommand(new Document("$eval", "getVesselInfo(\""+mmsi+"\",\""+startDate+"\",\""+endDate+"\")"));
		d = (Document) d.get("retval");
		return (ArrayList<Document>) d.get("_batch");
	}

	/**
	 * Read csv based file and save each row as an entry to mongodb database.
	 *
	 * @param filePath Input file path
	 * */
	public static void addAISInCSVFormatToDB(String filePath){
		Scanner lineReader = null;
		int i=0;
		try {
			lineReader = new Scanner(new File(filePath));
			while (lineReader.hasNext())
			{
				String [] params = lineReader.nextLine().split(";");

				collection.insertOne(new Document().append("mmsi",params[2]).append("date",params[1]).append("lat",params[3]).append("lon",params[4]).append("class",params[11]));
				if(i++%1000==0){
					System.out.println(i);
				}
			}
			lineReader.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
