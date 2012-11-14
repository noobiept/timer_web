import argparse
import json
import shutil

import os
import os.path


def copyFiles( configPath, resultingFolder ):

    """
        Format of configuration file:

        [
            "pathToFile.py",
            "pathToFolder",         # copies recursively all the contents of the folder
        ]
    """

    CURRENT_DIRECTORY = os.path.dirname( os.path.abspath(__file__) )


    resultingFolder = os.path.join( CURRENT_DIRECTORY, resultingFolder )

        #HERE -- ter uma opcao or something
    baseDirectory = os.path.abspath( os.path.join(CURRENT_DIRECTORY, '..') )



    configFile = open( configPath, 'r' )
    
        # parse the json file into an object
    configJson = json.loads( configFile.read() )

    configFile.close()

       # configJson is a list
    for fileOrFolder in configJson:


            # a file or a folder
        if isinstance( fileOrFolder, str ) or isinstance( fileOrFolder, unicode ):

            sourceFileOrFolder = os.path.join( baseDirectory, fileOrFolder )


                # a folder, copy all the files there
            if os.path.isdir( sourceFileOrFolder ):

                copyAllFilesFromFolder( baseDirectory, fileOrFolder, resultingFolder )

                # copy an individual file
            else:

                copyIndividualFile( baseDirectory, fileOrFolder, resultingFolder )

            # an error
        else:
            raise Exception( "Wrong type in JSON: Has to be a string or a dict." )




            

    

def copyAllFilesFromFolder( baseDirectory, pathToFolder, resultingFolder ):

    """
        Recursively copies the folder:

            baseDirectory/pathToFolder

        into:
            resultingFolder/pathToFolder
    """

    sourceFolder = os.path.join( baseDirectory, pathToFolder )

    destinationFolder = os.path.join( resultingFolder, pathToFolder )



        # create if doesn't exist
    if not os.path.isdir( destinationFolder ):
        os.makedirs( destinationFolder )

    allFiles = os.listdir( sourceFolder )

    for aFile in allFiles:

        sourceFilePath = os.path.join( sourceFolder, aFile )

        destinationFilePath = os.path.join( destinationFolder, aFile )

            # if there's another folder, call this function again (recursively)
        if os.path.isdir( sourceFilePath ):

            copyAllFilesFromFolder( baseDirectory, os.path.join( pathToFolder, aFile ), resultingFolder )
            continue

        shutil.copy( sourceFilePath, destinationFilePath )




def copyIndividualFile( baseDirectory, pathToFile, resultingFolder ):

    """
        Copies a single file from:

            baseDirectory/pathToFile

        into:
            resultingFolder/pathToFile
    """

    sourcePath = os.path.join( baseDirectory, pathToFile )

    destinationPath = os.path.join( resultingFolder, pathToFile )

    directory = os.path.dirname( destinationPath )

    if not os.path.exists( directory ):
        os.makedirs( directory )


    shutil.copy( sourcePath, destinationPath )





if __name__ == '__main__':    

    parser = argparse.ArgumentParser( description = 'Copy files according to a configuration file.' )

    parser.add_argument( 'configPath', help = "path to the configuration file.", nargs="?", default="copy_files_config.txt" )
    parser.add_argument( 'resultingFolder', help = "name of the folder that is created in the current path and contains the copies.", nargs="?", default="website" )

    args = parser.parse_args()


    copyFiles( args.configPath, args.resultingFolder )
